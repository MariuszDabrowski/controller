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

    function spellTemplate() {
      if (window.controller.highpriest) {
        const template = `
          <div class="spells">
            ${spells(towers[i])}
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
        ${(window.controller.user.faction && window.controller.user.hpstats) ? spellTemplate() : ''}
        ${renderTowerNumber(i)}
        </div>
    `

    if (window.controller.highpriest) alignSpells(towers[i]);
  }

  initMoveClickEvents();
};

function renderTowerNumber(i) {
  if (
    window.controller.highpriest ||
    window.controller.activeClasses.length > 2
  ) {
    if (i < 12) {
      return `
        <div class="command-wrapper__tower-number">
          ${i + 1}
        </div>
      `;
    }
  }

  return '';
}

function alignSpells(tower) {
  // Make sure the spells don't appear off screen (barracks)
  // If there is an odd number of spells, add a filler tile
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
  const defaultSpells = [
    {name: 'Strength', command: '!str', location: 'tower', level: 0},
    {name: 'Meditate', command: '!mdt', location: 'spire', level: 0}
  ];

  const factionSpells = {
    'Nomads Army': [
      {name: 'Enlighten', command: '!enl', location: 'train', level: 0},
      {name: 'Rapid Fire', command: '!rpd', location: 'tower', level: 0},
      {name: 'Slow Bubble', command: '!slw', location: 'tower', level: 0},
      {name: 'Power', command: '!pwr', location: 'tower', level: 10},
      {name: 'Trial', command: '!chg', location: 'train', level: 30},
      {name: 'Power Ooze', command: '!spw', location: 'train', level: 40},
      {name: 'Haste', command: '!hst', location: 'spire', level: 50}
    ],
    'Magi Order Army': [
      {name: 'Oracle', command: '!ora', location: 'spire', level: 0},
      {name: 'Shield', command: '!shd', location: 'train', level: 0},
      {name: 'Haste', command: '!hst', location: 'spire', level: 0},
      {name: 'Slow Bubble', command: '!slw', location: 'tower', level: 10},
      {name: 'Focus', command: '!fcs#', location: 'tower', level: 20},
      {name: 'Boulder Turret', command: '!bld', location: 'tower', level: 40},
      {name: 'Transmute', command: '!trn', location: 'train', level: 50}
    ],
    'Elementals Army': [
      {name: 'Knowledge', command: '!knw', location: 'train', level: 0},
      {name: 'Restoration', command: '!rst', location: 'train', level: 0},
      {name: 'Boulder Turret', command: '!bld', location: 'tower', level: 0},
      {name: 'Rapid Fire', command: '!rpd', location: 'tower', level: 20}
    ],
    'Wolfclan Army': [
      {name: 'Experience Ooze', command: '!sxp', location: 'train', level: 0},
      {name: 'Power Ooze', command: '!spw', location: 'train', level: 0},
      {name: 'Freeze', command: '!frz', location: 'spire', level: 0},
      {name: 'Fortify', command: '!frt', location: 'train', level: 10},
      {name: 'Mastery', command: '!mst', location: 'tower', level: 20},
      {name: 'Trial', command: '!chg', location: 'train', level: 50}
    ]
  };

  // The reason why we have name and title here is because sometimes the bot uses a short form...
  // ...of the spell name. But when displaing the spell on a tower we want to show the entire name.
  const purchasableSpells = [
    {name: 'Armor', title: 'Armor Turret', command: '!art', location: 'tower', level: 0},
    {name: 'Army', title: 'Army', command: '!arm', location: 'train', level: 0},
    {name: 'Luck', title: 'Luck', command: '!lck', location: 'spire', level: 0},
    {name: 'Unburrower', title: 'Unburrower', command: '!unb', location: 'train', level: 0},
    {name: 'Wisdom', title: 'Wisdom', command: '!wis', location: 'train', level: 0},
    {name: 'MassMastery', title: 'MassMastery', command: '!mss', location: 'spire', level: 0}
  ];

  let spells = ``;
  const towerCommand = tower.getAttribute('data-command');

  // Tower is the Altar
  if (towerCommand === '!altar') return ``;

  // Tower is the barracks
  if (towerCommand === '!train') {
    spells += generateSpellsTemplate(tower, defaultSpells, 'train');
    spells += generateSpellsTemplate(tower, factionSpells[window.controller.user.faction], 'train');
    spells += generateSpellsTemplate(tower, purchasableSpells, 'train', true);

    return spells;
  }

  // Tower is the spire
  if (towerCommand === 'undefined') {
    spells += generateSpellsTemplate(tower, defaultSpells, 'spire');
    spells += generateSpellsTemplate(tower, factionSpells[window.controller.user.faction], 'spire');
    spells += generateSpellsTemplate(tower, purchasableSpells, 'spire', true);

    return spells;
  }

  spells += generateSpellsTemplate(tower, defaultSpells, 'tower');
  spells += generateSpellsTemplate(tower, factionSpells[window.controller.user.faction], 'tower');
  spells += generateSpellsTemplate(tower, purchasableSpells, 'tower', true);

  return spells;
}

function generateSpellsTemplate(tower, spells, location, purchased) {
  let spellsTemplate = ``;

  spells.forEach(spell => {
    const checkIfPurchased = (purchased) ? window.controller.user.hpstats.purchased.indexOf(spell.name) >= 0 : true;
    if (checkIfPurchased) {
      if (
        spell.location === location &&
        window.controller.user.hpstats.level >= spell.level
      ) {
        if (location !== 'tower') {
          spellsTemplate += `<button class="spells__item" data-command="${spell.command}">${(spell.title) ? spell.title : spell.name}</button>`;
        } else {
          spellsTemplate += `<button class="spells__item" data-command="${spell.command}${tower.getAttribute('data-command').replace('!', '')}">${(spell.title) ? spell.title : spell.name}</button>`;
        }
      }
    }
  });
  
  return spellsTemplate;
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