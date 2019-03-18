import {sendCommand, sendWhisper} from './sendCommand';
import {updateTowerMoveControls} from './towerOverlays';
import {updatePowerButtons} from './powerButtons';
import {updateTargetingUI} from './targeting.js'

let activeClasses = [];
const characters = [
  {
    name: 'Archer',
    command: '!archer',
    specs: [
      {
        name: 'Bowman',
        command: '!specbowman',
        talents: [
          {name: 'Piercing', command: '!talpiercing'},
          {name: 'Falcon', command: '!talfalcon'}
        ]
      },{
        name: 'Sniper',
        command: '!specsniper',
        talents: [
          {name: 'Vulture', command: '!talvulture'},
          {name: 'Weaken', command: '!talweaken'}
        ]
      },{
        name: 'Gunner',
        command: '!specgunner',
        talents: [
          {name: 'Gunslinger', command: '!talgunslinger'},
          {name: 'Rockets!', command: '!talrockets'}
        ]
      }
    ]
  },{
    name: 'Rogue',
    command: '!rogue',
    specs: [
      {
        name: 'Knife-Thrower',
        command: '!specknifethrower',
        talents: [
          {name: 'Bounce', command: '!talbounce'},
          {name: 'Axe', command: '!talaxe'}
        ]
      },{
        name: 'Assassin',
        command: '!specassassin',
        talents: [
          {name: 'Charge', command: '!talcharge'},
          {name: 'Poison Strike', command: '!talpoisonstrike'}
        ]
      },{
        name: 'Ninja',
        command: '!specninja',
        talents: [
          {name: 'Deadly', command: '!taldeadly'},
          {name: 'Spread', command: '!talspread'}
        ]
      }
    ]
  },{
    name: 'Firemage',
    command: '!firemage',
    specs: [
      {
        name: 'Pyromancer',
        command: '!specpyromancer',
        talents: [
          {name: 'Maniac', command: '!talmaniac'},
          {name: 'Ignite', command: '!talignite'}
        ]
      },{
        name: 'Arcanist',
        command: '!specarcanist',
        talents: [
          {name: 'Haste', command: '!talhaste'},
          {name: 'Overdrive', command: '!taloverdrive'}
        ]
      },{
        name: 'Saboteur',
        command: '!specsaboteur',
        talents: [
          {name: 'Sticky', command: '!talsticky'},
          {name: 'Stacking', command: '!talstacking'}
        ]
      }
    ]
  },{
    name: 'Timemage',
    command: '!timemage',
    specs: [
      {
        name: 'IceMage',
        command: '!specicemage',
        talents: [
          {name: 'Chilling', command: '!talchilling'},
          {name: 'Freezing', command: '!talfreezing'}
        ]
      },{
        name: 'Trickster',
        command: '!spectrickster',
        talents: [
          {name: 'Charming', command: '!talcharming'},
          {name: 'Charisma', command: '!talcharisma'}
        ]
      },{
        name: 'LightningMage',
        command: '!speclightningmage',
        talents: [
          {name: 'Stunning', command: '!talstunning'},
          {name: 'Chain', command: '!talchain'}
        ]
      }
    ]
  },{
    name: 'Poisoner',
    command: '!poisoner',
    specs: [
      {
        name: 'PlagueDoctor',
        command: '!specplaguedoctor',
        talents: [
          {name: 'Elixr', command: '!talelixir'},
          {name: 'Necromancer', command: '!talnecromancer'}
        ]
      },{
        name: 'UndeadArcher',
        command: '!specundeadarcher',
        talents: [
          {name: 'DoubleBow', command: '!taldoublebow'},
          {name: 'Raise', command: '!talraise'}
        ]
      },{
        name: 'Deathdealer',
        command: '!specdeathdealer',
        talents: [
          {name: 'Empowered', command: '!talempowered'},
          {name: 'Seed', command: '!talseed'}
        ]
      }
    ]
  },{
    name: 'Bard',
    command: '!bard',
    specs: [
      {
        name: 'Minstrel',
        command: '!specminstrel',
        talents: [
          {name: 'Amplify', command: '!talamplify'},
          {name: 'Mimic', command: '!talmimic'}
        ]
      },{
        name: 'Commander',
        command: '!speccommander',
        talents: [
          {name: 'Booming', command: '!talbooming'},
          {name: 'Quickdraw', command: '!talquickdraw'}
        ]
      },{
        name: 'Scout',
        command: '!specscout',
        talents: [
          {name: 'Intel', command: '!talintel'},
          {name: 'Rupture', command: '!talrupture'}
        ]
      }
    ]
  }
]

// --------
// Template
// --------

function specTemplate(spec) {
  return `
  <div class="specs__item">
    <button class="specs__item__button" data-command="${spec.command}">
      ${spec.name}
    </button>
    <div class="talents">
      ${spec.talents.map(talent => talentTemplate(talent)).join('')}
      <div class="cost-wrapper">
        <span class="cost cost--bottom"><span class="cost__price">5,000</span> <span class="cost__coin"></span></span>
      </div>
    </div>
  </div>
  `;
};

function talentTemplate(talent) {
  return `
    <button class="talents__item" data-command="${talent.command}">
      ${talent.name}
    </button>
  `;
};

function initClassButtons() {
  const container = document.createElement('div');
  container.classList.add('class-buttons');
  
  let template = ``;
  template += '<div class="class-buttons__container">';

  characters.forEach(character => {
    template += `
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-class="${character.name.toLocaleLowerCase()}" data-command="${character.command}">${character.name}</button>
        <div class="specs">
          ${character.specs.map(spec => specTemplate(spec)).join('')}
          <div class="cost-wrapper">
            <span class="cost cost--bottom"><span class="cost__price">5,000</span> <span class="cost__coin"></span></span>
          </div>
        </div>
      </div>
    `;
  });

  template += `
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-type="highpriest" data-command="!highpriest">Highpriest</button>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-type="leave" data-command="!leave">Leave</button>
      </div>
    </div>
  `;

  container.innerHTML = template;
  window.controller.videoContainer.appendChild(container);
  clickEvents();
}

// ------------
// Click Events
// ------------

function clickEvents() {
  const buttons = document.querySelectorAll('.class-buttons__container button');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      let command = this.getAttribute('data-command');
      
      // Clicked on a class
      if (this.getAttribute('data-class')) {
        const className = this.getAttribute('data-class');
        const classIndex = activeClasses.indexOf(className);

        if (classIndex < 0) {
          activeClasses.push(className);
          this.classList.add('class-buttons__item__button--active');
        } else {
          activeClasses.splice(classIndex, 1);
          this.classList.remove('class-buttons__item__button--active');
          command = `${className[0]}!leave`;
        }

        classesUpdated();
      }

      // Clicked on the clear classes button
      if (this.getAttribute('data-type') === 'leave') {
        clearClasses();
        classesUpdated();
      }

      // Clicked on highpriest
      if (this.getAttribute('data-type') === 'highpriest') {
        if (window.controller.highpriest) {
          window.controller.highpriest = false;
          command = `${command[1]}!leave`;
          this.classList.remove('class-buttons__item__button--active');
        } else {
          window.controller.highpriest = true;
          this.classList.add('class-buttons__item__button--active');
          if (!window.controller.user.hpstats) {
            sendWhisper('!spells', window.controller.user);
            if (!window.controller.user.faction) sendWhisper('!gems', window.controller.user);
          }
        }

        classesUpdated();
      }

      if (command) {
        sendCommand(command); 
      }
    });
  }
};

function clearClasses() {
  const activeButtons = document.querySelectorAll('.class-buttons__item__button--active');
  activeButtons.forEach(button => button.classList.remove('class-buttons__item__button--active'));
  activeClasses = [];
  window.controller.highpriest = false;
  classesUpdated();
}

// ---------------
// Classes updated
// ---------------

function classesUpdated() {
  window.controller.activeClasses = activeClasses;
  updateTowerMoveControls();
  updatePowerButtons();
  updateTargetingUI();
}

export {initClassButtons, clearClasses};