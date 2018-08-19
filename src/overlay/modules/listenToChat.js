import {sendCommand} from './sendCommand';
import {updateTowerSpells} from './towerSpells';

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

const getGemInUse = function(user, parsedMessage) {
  // console.log(message);
  if (parsedMessage.message) {
    if (parsedMessage.message.toLowerCase().includes(user.userName.toLowerCase() + ' switched')) {
      const gem = parsedMessage.message.toLowerCase().replace(`${user.userName.toLowerCase()} switched to `, '')
      user.gemStats.using = gem.toLowerCase();
      user.updatedStats();

      if (window.controller.towerSpellsActive) {
        updateTowerSpells();
      }
    }
  }
};

const updateGemStats = function(user, parsedMessage) {
  let gemStats = {};
  let gemMessage = parsedMessage.message.trim().replace(/\s/g,'');
  let gemArray = gemMessage.split('][').map(x => {
    const keyValue = x.split(':');
    gemStats[keyValue[0].replace('[', '').toLowerCase()] = keyValue[1].replace(']', '').toLowerCase();
  });
  
  user.gemStats = gemStats;
  user.updatedStats();
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
      // console.log(specsDictionary[keys[i]], spec, specsDictionary[keys[i]].includes(spec));
      if (specsDictionary[keys[i]].includes(spec)) {
        if (!user.specs) user.specs = {};
        user.specs[keys[i]] = spec;
      };
    }
  });
  
  user.updatedStats();
};

// -----------------------
// Listen to chat commands
// -----------------------

const listenToChat = function(user, message) {
  let parsedMessage = null;

  if (message.data[0] === '@') { // @ signifies that it's a message command

    parsedMessage = parseMessage(message);
    getGemInUse(user, parsedMessage); // Listen to see if the users gem changes

    // ---------------------------------------
    // Private message from TTDBot to the user
    // ---------------------------------------

    if (parsedMessage['display-name'] === 'TTDBot') {
      if (parsedMessage['recipient'] === user.userName) {
        if (parsedMessage.message.includes('Gem Rank')) {
          updateGemStats(user, parsedMessage);
        } else if (parsedMessage.message.includes('Rank') && parsedMessage.message.includes('Highpriest')) {
          updateSpecs(user, parsedMessage);
        } else {
          sendCommand(parsedMessage.message);
        }
      }
      
      // TTDBot message about spec change
      if (parsedMessage.message.toLowerCase().includes(`${user.userName} has changed their`) && parsedMessage['display-name'] === 'TTDBot') {
        user.class = user.tempMemory.class;
        user.specs[user.class] = user.tempMemory.spec;
        user.updatedStats();
      }
    }

  } else if (message.data.split(' ')[0] === 'PING') {
    // Reply to the PING PONG keep alive command to prevent disconnect
    user.socket.send(message.data.replace('PING', 'PONG'));
    console.log('replied with: ' + message.data.replace('PING', 'PONG'));
  }
};

export default listenToChat;