import {sendCommand} from './sendCommand';

let towers = [];
let towerElements = [];

// ------------------
// Move click events
// ------------------

const initMoveClickEvents = function() {
  const moveButtons = document.querySelectorAll('.command-wrapper__move__button');
  const spellButtons = document.querySelectorAll('.spells__item');
  const moveClick = function() {
    const command = this.getAttribute('data-command');
    sendCommand(command);
  };

  for (let i = 0; i < moveButtons.length; i++) {
    moveButtons[i].addEventListener('click', moveClick);
  }

  for (let i = 0; i < spellButtons.length; i++) {
    spellButtons[i].addEventListener('click', function() {
      const command = this.getAttribute('data-command');
      sendCommand(command);
    });
  }
};

// --------------------
// Clear tower overlays
// --------------------

const clearTowerOverlays = function() {
  const buildings = document.querySelectorAll('.tower');
  towers = [];
  towerElements = [];
  for (let i = 0; i < buildings.length; i++) {
    buildings[i].remove();
  }
};

// ------------
// Create tower
// ------------

const Tower = function() {
  this.element = null;

  this.init = function(top, left, width = '7.9%', height = '23.8434164%', command) {
    this.element = document.createElement('div');
    this.element.classList.add('tower');
    this.element.style.width = width;
    this.element.style.height = height;
    this.element.style.top = top;
    this.element.style.left = left;
    this.element.setAttribute('data-command', command);
    towerElements.push(this.element);
  };
};

// ---------------
// Generate towers
// ---------------

const generateTowers = function(mapData) {
  let index = 0;
  Object.keys(mapData).map(tower => {
    towers.push(new Tower());
    towers[index].init(mapData[tower].top, mapData[tower].left, mapData[tower].width, mapData[tower].height, mapData[tower].command);
  });

  for (let i = 0; i < towerElements.length; i++) {
    window.controller.videoContainer.appendChild(towerElements[i]);
  }
};

const initTowerMoveControls = function() {
  const towers = document.querySelectorAll('.tower');
  const activeClasses = window.controller.activeClasses;

  // Add controls to each tower
  for (let i = 0; i < towers.length; i++){
    const towerCommand = towers[i].getAttribute('data-command');
    const classCombinations = [];

    if (activeClasses.length > 2) {
      for (let i = 0; i < activeClasses.length - 1; i++) {
        for (let j = i + 1; j < activeClasses.length; j++) {
          classCombinations.push(activeClasses[i][0] + activeClasses[j][0]);
        }
      }
    }

    const spellTemplate = function() {
      if (window.controller.highpriest && towers[i].getAttribute('data-command') !== '!altar') {
        const template = `
          <div class="spells">
            ${(towers[i].getAttribute('data-command') !== '!train') ? spells(towers[i]).train : spells(towers[i]).tower}
          </div>
        `;
        return template;
      }

      return ``;
    };

    function moveWrapper(tower) {
      if (activeClasses.length > 0) {
        return `
        <div class="command-wrapper__move">
          ${(activeClasses.length > 1 && activeClasses.length < 3 && window.controller.highpriest && tower.getAttribute('data-command') !== '!altar') ? `<button class="command-wrapper__move__button move-all" data-command="${towerCommand}">All</button>` : ""}
          ${activeClasses.map(item => `<button class="command-wrapper__move__button" data-command="${item[0] + towerCommand}">${(activeClasses.length === 1) ? 'Move here' : item[0].toUpperCase()}</button>`).join('')}
          ${(activeClasses.length > 2) ? classCombinations.map(item => `<button class="command-wrapper__move__button" data-command="${item + towerCommand}">${item.toUpperCase()}</button>`).join('') : ""}
          ${(activeClasses.length >= 2 && !window.controller.highpriest && tower.getAttribute('data-command') !== '!altar') ? `<button class="command-wrapper__move__button move-all" data-command="${towerCommand}">All</button>` : ""}
          ${(activeClasses.length >= 2 && tower.getAttribute('data-command') === '!altar') ? `<button class="command-wrapper__move__button move-all" data-command="${towerCommand}">All</button>` : ""}
        </div>
        `;
      }

      return ``;
    }

    towers[i].innerHTML = `
      <div class="
        command-wrapper
        ${(window.controller.highpriest) ? `highpriest-active` : ``}
        ${(activeClasses.length === 2) ? `command-wrapper--2` : ``}
        ${(activeClasses.length === 3) ? `command-wrapper--3` : ``}
      ">
        ${moveWrapper(towers[i])}
        ${spellTemplate()}
        ${(window.controller.highpriest || activeClasses.length > 2) ? `<div class="command-wrapper__tower-number">${(i < 12 && window.controller.highpriest || i < 12 && activeClasses.length > 0) ? i + 1 : ``}</div>` : ``}
      </div>
    `;

    if (window.controller.highpriest) alignSpells(towers[i]);
  }

  initMoveClickEvents();
};

function alignSpells(tower) {
  const spellsWrapper = tower.querySelector('.spells');
  const items = tower.querySelectorAll('.spells__item');
  let longestItem = null;
  
  if (spellsWrapper) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].clientWidth > longestItem) {
        longestItem = items[i].clientWidth;
      }
    }

    if (items.length % 2 === 1) {
      const filler = document.createElement('div');
      filler.classList.add('spells__filler');
      spellsWrapper.appendChild(filler);
    }
    
    spellsWrapper.style.width = longestItem * 2 + 'px';
    spellsWrapper.style.flexWrap = 'wrap';
  }
}

function spells(tower) {
  const spells = {
    train: ``,
    tower: ``
  }

  const hpstats = {
    level: 43,
    gem: 'ruby',
    purchased: ['MassMastery', 'Luck', 'Wisdom', 'Armor Turret']
  }

  const defaultSpells = [
    {name: 'Strength', command: '!str', location: 'tower', level: 0},
    {name: 'Meditate', command: '!mdt', location: 'train', level: 0}
  ];

  const gemSpells = {
    citrine: [
      {name: 'Enlighten', command: '!enl', location: 'train', level: 0},
      {name: 'Rapid Fire', command: '!rpd', location: 'tower', level: 0},
      {name: 'Slow Bubble', command: '!slw', location: 'tower', level: 0},
      {name: 'Power', command: '!pwr', location: 'tower', level: 10},
      {name: 'Trial', command: '!chg', location: 'train', level: 30},
      {name: 'Power Ooze', command: '!spw', location: 'train', level: 40},
      {name: 'Haste', command: '!hst', location: 'train', level: 50}
    ],
    ruby: [
      {name: 'Oracle', command: '!ora', location: 'train', level: 0},
      {name: 'Shield', command: '!shd', location: 'train', level: 0},
      {name: 'Haste', command: '!hst', location: 'train', level: 0},
      {name: 'Slow Bubble', command: '!slw', location: 'tower', level: 10},
      {name: 'Focus', command: '!fcs#', location: 'tower', level: 20},
      {name: 'Boulder Turret', command: '!bld', location: 'tower', level: 40},
      {name: 'Transmute', command: '!trn', location: 'train', level: 50}
    ],
    emerald: [
      {name: 'Knowledge', command: '!knw', location: 'train', level: 0},
      {name: 'Restoration', command: '!rst', location: 'train', level: 0},
      {name: 'Boulder Turret', command: '!bld', location: 'tower', level: 0},
      {name: 'Rapid Fire', command: '!rpd', location: 'tower', level: 20}
    ],
    onyx: [
      {name: 'Experience Ooze', command: '!sxp', location: 'train', level: 0},
      {name: 'Power Ooze', command: '!spw', location: 'train', level: 0},
      {name: 'Freeze', command: '!frz', location: 'train', level: 0},
      {name: 'Fortify', command: '!frt', location: 'train', level: 10},
      {name: 'Mastery', command: '!mst', location: 'tower', level: 20},
      {name: 'Trial', command: '!chg', location: 'train', level: 50}
    ]
  };

  const purchasableSpells = [
    {name: 'Armor Turret', command: '!art', location: 'tower', level: 0},
    {name: 'Army', command: '!arm', location: 'train', level: 0},
    {name: 'Luck', command: '!lck', location: 'train', level: 0},
    {name: 'Unburrower', command: '!unb', location: 'train', level: 0},
    {name: 'Wisdom', command: '!wis', location: 'train', level: 0},
    {name: 'MassMastery', command: '!mss', location: 'train', level: 0}
  ];

  // -----------------
  // Highpriest spells
  // -----------------

  if (tower.getAttribute('data-command') !== '!altar') {
    if (tower.getAttribute('data-command') === '!train') {

      // ----------------------
      // Only training commands
      // ----------------------

      for (let i = 0; i < defaultSpells.length; i++) {
        if (
          defaultSpells[i].location === 'train' &&
          hpstats.level >= defaultSpells[i].level
        ) {
          spells.tower += `<button class="spells__item" data-command="${defaultSpells[i].command}">${defaultSpells[i].name}</button>`;
        }
      }

      for (let i = 0; i < gemSpells[hpstats.gem].length; i++) {
        if (
          gemSpells[hpstats.gem][i].location === 'train' &&
          hpstats.level >= gemSpells[hpstats.gem][i].level
        ) {
          spells.tower += `<button class="spells__item" data-command="${gemSpells[hpstats.gem][i].command}">${gemSpells[hpstats.gem][i].name}</button>`;;
        }
      }

      for (let i = 0; i < purchasableSpells.length; i++) {
        if (
          hpstats.purchased.indexOf(purchasableSpells[i].name) >= 0 &&
          purchasableSpells[i].location === 'train' &&
          hpstats.level >= purchasableSpells[i].level
        ) {
          spells.tower += `<button class="spells__item" data-command="${purchasableSpells[i].command}">${purchasableSpells[i].name}</button>`;
        }
      }
    } else {

      // -------------------
      // Only tower commands
      // -------------------

      for (let i = 0; i < defaultSpells.length; i++) {
        if (
          defaultSpells[i].location === 'tower' &&
          hpstats.level >= defaultSpells[i].level
        ) {
          spells.train += `<button class="spells__item" data-command="${defaultSpells[i].command}${tower.getAttribute('data-command').replace('!', '')}">${defaultSpells[i].name}</button>`;
        }
      }

      for (let i = 0; i < gemSpells[hpstats.gem].length; i++) {
        if (
          gemSpells[hpstats.gem][i].location === 'tower' &&
          hpstats.level >= gemSpells[hpstats.gem][i].level
        ) {
          spells.train += `<button class="spells__item" data-command="${gemSpells[hpstats.gem][i].command}${tower.getAttribute('data-command').replace('!', '')}">${gemSpells[hpstats.gem][i].name}</button>`;
        }
      }

      for (let i = 0; i < purchasableSpells.length; i++) {
        if (
          hpstats.purchased.indexOf(purchasableSpells[i].name) >= 0 &&
          purchasableSpells[i].location === 'tower' &&
          hpstats.level >= purchasableSpells[i].level
        ) {
          spells.train += `<button class="spells__item" data-command="${purchasableSpells[i].command}${tower.getAttribute('data-command').replace('!', '')}">${purchasableSpells[i].name}</button>`;
        }
      }

      //
    }
  }

  return spells;
}

const destroyTowerMoveControls = function() {
  const towers = document.querySelectorAll('.towers');
  for (let i = 0; i < towers.length; i++){
    towers[i].innerHTML = '';
  }
};

const updateTowerMoveControls = function() {
  if (window.controller.activeMap) {
    destroyTowerMoveControls();
    initTowerMoveControls();
  }
};

export {generateTowers, clearTowerOverlays, initTowerMoveControls, destroyTowerMoveControls, updateTowerMoveControls};