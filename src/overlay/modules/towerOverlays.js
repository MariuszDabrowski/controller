import {sendCommand} from './sendCommand';

let towers = [];
let towerElements = [];

// ------------------
// Move click events
// ------------------

const initMoveClickEvents = function() {
  const moveButtons = document.querySelectorAll('.command-wrapper__move__button');
  const moveClick = function() {
    const command = this.getAttribute('data-command');
    sendCommand(command);
  };

  for (let i = 0; i < moveButtons.length; i++) {
    moveButtons[i].addEventListener('click', moveClick);
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
  const activeClasses = Object.keys(window.controller.user.activeClasses).filter(key => window.controller.user.activeClasses[key] );

  console.log(activeClasses);
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

    towers[i].innerHTML = `
      <div class="
        command-wrapper
        ${(activeClasses.length === 1) ? `command-wrapper--1` : ``}
        ${(activeClasses.length === 2) ? `command-wrapper--2` : ``}
        ${(activeClasses.length === 3) ? `command-wrapper--3` : ``}
      ">
        <div class="command-wrapper__move">
          ${activeClasses.map(item => `<button class="command-wrapper__move__button" data-command="${item[0] + towerCommand}">${item[0].toUpperCase()}</button>`).join('')}
          ${(activeClasses.length > 2) ? classCombinations.map(item => `<button class="command-wrapper__move__button" data-command="${item + towerCommand}">${item.toUpperCase()}</button>`).join('') : ""}
        </div>
        ${(activeClasses.length > 1) ? `<button class="command-wrapper__move__button move-all" data-command="${towerCommand}">All</button>` : ""}
      </div>
    `;
  }

  initMoveClickEvents();
};

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