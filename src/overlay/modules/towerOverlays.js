import {sendCommandFromAll} from './sendCommand';

let towers = [];
let towerElements = [];

// ------------------
// Tower click events
// ------------------

const initTowerClickEvents = function() {
  const towers = document.querySelectorAll('.tower');
  const towerClick = function() {
    const command = this.getAttribute('data-command');
    sendCommandFromAll(command);
  };

  for (let i = 0; i < towers.length; i++) {
    towers[i].addEventListener('click', towerClick);
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

  initTowerClickEvents();
};

export {generateTowers, clearTowerOverlays};