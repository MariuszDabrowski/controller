import {clearClasses} from './classButtons';
import {resetActiveMap} from './overlaySelector';
import {sendCommand, sendWhisper} from './sendCommand';
import {updateTowerMoveControls} from './towerOverlays';

const specsDictionary = {
  archer: ['bowman', 'sniper', 'gunner'],
  rogue: ['knifethrower', 'assassin', 'ninja'],
  firemage: ['pyromancer', 'bombermage', 'saboteur'],
  frostmage: ['icemage', 'trickster', 'lightningmage', 'shockmage'],
  alchemist: ['plaguedoctor', 'undeadarcher', 'deathdealer', 'potionmaster'],
  bard: ['minstrel', 'commander', 'scout']
};

// --------------------------------------
// Parse the message into readable object
// --------------------------------------

const parseMessage = function(message) {
  let parsedMessage = {};
  const splitMessage = message.data.split(';');

  splitMessage.map(function(item) {
    const itemProperties = item.split('=');
    parsedMessage[itemProperties[0]] = itemProperties[1];
  });

  if (parsedMessage['user-type']) {
    if (parsedMessage.mod) {
      parsedMessage['user-type'] = parsedMessage['user-type'].replace('mod :', ' :');
    }
    parsedMessage.info = parsedMessage['user-type'].match(/^\s.*?\s/g)[0].trim();
    parsedMessage.type = parsedMessage['user-type'].match(/[A-Z].*?\s/g)[0].trim();
    parsedMessage.message =  parsedMessage['user-type'].match(/(?<!^) :(?!\s).*/g);
    parsedMessage.recipient = parsedMessage['user-type'].match(/(?<!^)\s.*\s:/g);
    if (parsedMessage.message) {
      parsedMessage.message = parsedMessage.message[0].replace(' :', '');
    }
    if (parsedMessage.recipient) {
      parsedMessage.recipient = parsedMessage.recipient[0].split(' ')[2];
    }
  }

  return parsedMessage;
};

// ---------------------------
// Find out what gem is in use
// ---------------------------

const updateFaction = function(user, parsedMessage) {
  user.faction = parsedMessage.message.split(' in the ')[1].replace('!', '');
  // Dongerlistdotcom is now a Captain in the Elementals Army!
  if (window.controller.highpriest) updateTowerMoveControls();
  console.log('updated faction: ', user.faction);
};

const requestFaction = function(user, parsedMessage) {
  let medals = parsedMessage.message
              .split('] [')[0]
              .trim()
              .replace('[', '')
              .replace(']', '')
              .replace('Medals: ', '')
              .split('/');

  let faction = parsedMessage.message
                .split('] [')[1]
                .replace(']]', '')
                .split('of the ')[1]
  
  const factionCommands = {
    'Nomad Army': '!joinnomads',
    'Elementals Army': '!joinelementals',
    'Magi Order Army': '!joinmagiorder',
    'Wolfclan Army': '!joinwolfclan'
  }

  user.faction = faction;
  user.medals = {
    current: medals[0],
    total: medals[1]
  };

  console.log(user.faction, user.medals);
  if (window.controller.highpriest) updateTowerMoveControls();
};

const updateSpecs = function(user, parsedMessage) {
  let specs = {};
  let specMessage = parsedMessage.message.trim().replace(/\s/g,'');
  let specArray = specMessage.split('][').map(x => {
    const cleanedUpSpec = x.replace('[', '').replace(']', '').replace('Rank', '');
    const level = cleanedUpSpec.match(/\d+/g);
    const spec = cleanedUpSpec.match(/\D+/g)[0];

    const keys = Object.keys(specsDictionary);
    for (let i = 0; i < keys.length; i++) {
      if (specsDictionary[keys[i]].includes(spec)) {
        if (!user.specs) user.specs = {};
        user.specs[keys[i]] = spec;
      };
    }
  });
};

// -----------------------
// Listen to chat commands
// -----------------------

const listenToChat = function(user, message) {
  let parsedMessage = null;

  if (message.data[0] === '@') { // @ signifies that it's a message command
    parsedMessage = parseMessage(message);
    // getFactionInUse(user, parsedMessage); // Listen to see if the users gem changes

    // Trigger functions if the message was sent by
    if (
      !parsedMessage['@msg-id'] &&
      parsedMessage['display-name'] === user.userName &&
      !parsedMessage.message
    ) {
      if (user.lastMessage) {
        const lastMessage = user.lastMessage.replace(' .', '').replace('!', '');
      }
    }

    // ---------------------------------------
    // Private message from TTDBot to the user
    // ---------------------------------------

    // if (parsedMessage['display-name'] === 'dongerlistdotcom' && parsedMessage.message) {
    //   if (parsedMessage.message) {}
    // }

    if (parsedMessage['display-name'] === 'TTDBot') {
      // Message is from TTDBOT
      
      // If a new game is starting reset the classes and map
      if (parsedMessage.message) {
        if (parsedMessage.message.includes('Ready to start the next game')) {
          if (window.controller.activeClasses.length) window.controller.activeClasses = [];
          if (window.controller.activeMap) resetActiveMap();
          clearClasses();
        }
      }

      if (parsedMessage['recipient'] === user.userName) {
        // Private message from TTDBot
        if (parsedMessage.message.includes('[Medals:')) {
          // If user types !gems
          requestFaction(user, parsedMessage);
        } else if (parsedMessage.message.includes('Rank') && parsedMessage.message.includes('Highpriest')) {
          updateSpecs(user, parsedMessage);
        } else if (parsedMessage.message.includes('Spells Available:')) {
          // If user types !spells
          user.hpstats = {
            level: parseInt(parsedMessage.message.split('] [')[0].replace('[Priest Rank: ', '')),
            available: parseInt(parsedMessage.message.split('] [')[1].replace('Spells Available: ', '')),
            purchased: parsedMessage.message.split('] [')[2].replace('Learned: ', '').replace(']', '').split(', ')
          }

          if (window.controller.highpriest) updateTowerMoveControls();
          console.log(window.controller.user.hpstats);
        }
      }
      
      if (parsedMessage.message.toLowerCase().includes(user.userName)) {
        // Message about you

        if (parsedMessage.message.includes('upgraded highpriest')) {
          // If the users highpriest level changed
          if (window.controller.highpriest) {
            window.controller.hpstats.level = parseInt(parsedMessage.message.split(' to Rank ')[1]);
            updateTowerMoveControls();
          }
        }

        if (parsedMessage.message.includes(' is now a ')) {
          // If user changes factions
          updateFaction(user, parsedMessage);
        }
  
        if (parsedMessage.message.includes('Has learned') || parsedMessage.message.includes('Has unlearned')) {
          // If the user learns or unlearns a spell
          if (window.controller.highpriest) {
            sendWhisper('!spells', window.controller.user);
            updateTowerMoveControls();
          }
        }
      }
    }

  } else if (message.data.split(' ')[0] === 'PING') {
    // Reply to the PING PONG keep alive command to prevent disconnect
    user.socket.send(message.data.replace('PING', 'PONG'));
    console.log('replied with: ' + message.data.replace('PING', 'PONG'));
  }
};

export default listenToChat;