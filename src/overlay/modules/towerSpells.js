import loopOverUsers from '../helpers/loopOverUsers';
import {sendCommandFromAll} from './sendCommand';

const towerSpells = {
  all: [
    {command: 'str', name: 'Strength'}
  ],
  onyx: [
    {command: 'mst', name: 'Mastery'}
  ],
  emerald: [
    {command: 'bld', name: 'Boulder Turret'}
  ],
  citrine: [
    {command: 'slw', name: 'Slow Bubble'},
    {command: 'pwr', name: 'Power'}
  ],
  ruby: [
    {command: 'slw', name: 'Slow Bubble'},
    {command: 'fcs', name: 'Focus'},
    {command: 'bld', name: 'Boulder Turret'}
  ]
};

const initTowerSpells = function() {
  if (window.controller.activeMap) {
    window.controller.towerSpellsActive = true;
    window.controller.videoContainer.classList.add('tower-spells-active');
    console.log('init tower spells');

    // Figure out what gems are being used
    const activeGems = [];
    loopOverUsers(function(user) {
      if (!activeGems.includes(user.gemStats.using)) {
        activeGems.push(user.gemStats.using);
      }
    });

    // Generate the spell buttons onto the towers
    const towers = document.querySelectorAll('.tower');

    for (let i = 0; i < towers.length; i++) {
      const towerNumber = towers[i].getAttribute('data-command').replace('!', '');
      const spellsOnTowers = [];
      const spellContainer = document.createElement('div');
      spellContainer.classList.add('spell-container');

      for (let i = 0; i < activeGems.length; i++) {
        for (let j = 0; j < towerSpells[activeGems[i]].length; j++) {
          if (!spellsOnTowers.includes(towerSpells[activeGems[i]][j].name)) {
            spellsOnTowers.push(towerSpells[activeGems[i]][j].name);

            //
            const spellRow = document.createElement('div');
            spellRow.classList.add('spell-container__item');

            //
            const spellMain = document.createElement('button');
            spellMain.classList.add('spell-container__item__button');
            spellMain.setAttribute('command', `!hp${towerSpells[activeGems[i]][j].command}${towerNumber}`);
            spellMain.innerHTML = towerSpells[activeGems[i]][j].name;
            spellRow.appendChild(spellMain);

            //
            // const spell2 = document.createElement('button');
            // spell2.classList.add('spell-container__item__button');
            // spell2.setAttribute('command', `!hp2${towerSpells[activeGems[i]][j].command}${towerNumber}`);
            // spell2.innerHTML = '2';
            // spellRow.appendChild(spell2);

            //
            // const spell3 = document.createElement('button');
            // spell3.classList.add('spell-container__item__button');
            // spell3.setAttribute('command', `!hp3${towerSpells[activeGems[i]][j].command}${towerNumber}`);
            // spell3.innerHTML = '3';
            // spellRow.appendChild(spell3);

            spellContainer.appendChild(spellRow);
          }
        }
      }

      towers[i].appendChild(spellContainer);
    }

    const spellButtons = document.querySelectorAll('.spell-container__item__button');

    for (let i = 0; i < spellButtons.length; i++) {
      spellButtons[i].addEventListener('click', function(e) {
        e.stopPropagation();
        sendCommandFromAll(this.getAttribute('command'));
      });
    }
  }
};

const destroyTowerSpells = function() {
  window.controller.towerSpellsActive = false;
  window.controller.videoContainer.classList.remove('tower-spells-active');
  console.log('destroy tower spells');
  const spellContainers = document.querySelectorAll('.spell-container');
  for (let i = 0; i < spellContainers.length; i++) {
    spellContainers[i].remove();
  }
};

const updateTowerSpells = function() {
  console.log('update tower spells');
  destroyTowerSpells();
  initTowerSpells();
};

export {initTowerSpells, destroyTowerSpells, updateTowerSpells};