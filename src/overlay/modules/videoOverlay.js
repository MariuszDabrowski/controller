import sendCommand from './sendCommand';
import positions from './positions';

let channelPageVideoPlayer = null;
let overlayContainers = null;
let resizeTimer;
let towers = [];
let towerElements = [];

const Tower = function() {
  this.element = null;

  this.init = function(top, left, width = '7.9%', height = '23.8434164%', command) {
    this.element = document.createElement('div');
    this.element.classList.add('tower');
    this.element.style.width = width;
    this.element.style.height = height;
    this.element.style.top = top;
    this.element.style.left = left;
    this.element.setAttribute('data-button', 'command');
    this.element.setAttribute('data-command', command);

    towerElements.push(this.element);
  };
};

const generateTowers = function(mapData) {
  let index = 0;
  Object.keys(mapData).map(tower => {
    towers.push(new Tower());
    towers[index].init(mapData[tower].top, mapData[tower].left, mapData[tower].width, mapData[tower].height, mapData[tower].command);
  });

  for (let i = 0; i < towerElements.length; i++) {
    document.querySelectorAll('.video-wrapper')[0].appendChild(towerElements[i]);
  }

  duplicateOverlays();
};

// --------------
// Resize overlay
// --------------
// When opening the Chrome dev tools, the overlay doesn't get the right width

const resizeOverlays = function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    for (let i = 0; i < overlayContainers.length; i++) {
      const overlayImg = overlayContainers[i].querySelector('.video-overlay__img');
      const overlay = overlayContainers[i].querySelector('.video-wrapper');
      overlay.style.width = `${overlayImg.clientWidth}px`;
      overlay.style.height = `${overlayImg.clientHeight}px`;
    }
  }, 200);
};

// ---------------
// Resize triggers
// ---------------

const initResizeTriggers = function() {
  const sideNavToggleVisibility = document.querySelector('.side-nav__toggle-visibility');
  const rightColumnToggleVisibility = document.querySelector('.right-column__toggle-visibility');
  const playerButtonsRight = document.querySelector('.player-buttons-right');

  sideNavToggleVisibility.addEventListener('click', resizeOverlays);
  rightColumnToggleVisibility.addEventListener('click', resizeOverlays);
  playerButtonsRight.addEventListener('click', resizeOverlays);
  window.addEventListener('resize', resizeOverlays);
  resizeOverlays();
};

// ------------------
// Tower click events
// ------------------

const initTowerClickEvents = function() {
  const towers = document.querySelectorAll('.tower');
  const towerClick = function() {
    const command = this.getAttribute('data-command');
    sendCommand(window.controller.channel, command);
  };

  for (let i = 0; i < towers.length; i++) {
    towers[i].addEventListener('click', towerClick);
  }
};

// ------------------
// Duplicate overlays
// ------------------

const duplicateOverlays = function() {
  const playerVideo = document.querySelector('.player-video');
  const videoOverlayClone = overlayContainers[0].cloneNode(true);

  if (overlayContainers[1]) {
    overlayContainers[1].remove();
  }

  playerVideo.appendChild(videoOverlayClone);
  overlayContainers = document.querySelectorAll('.video-overlay');
};

// ----------------
// Generate overlay
// ----------------

const generateOverlay = function() {
  const videoOverlay = document.createElement('div');
  videoOverlay.classList.add('video-overlay');
  videoOverlay.innerHTML = `
    <img src="http://via.placeholder.com/2880x1620/ff0000" alt="" class="video-overlay__img" />
  `;

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('video-wrapper');
  videoOverlay.appendChild(videoWrapper);
  
  channelPageVideoPlayer.appendChild(videoOverlay);
  overlayContainers = document.querySelectorAll('.video-overlay');

  overlaySelector();
  duplicateOverlays();
  initTowerClickEvents();
  initResizeTriggers();
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

// -----------------------
// Overlay selector events
// -----------------------

const overlaySelectorEvents = function() {
  const buttons = document.querySelectorAll('[data-button="overlay-change"]');
  const changeOverlay = function() {
    clearTowerOverlays();
    generateTowers(positions[this.getAttribute('data-overlay')]);
  };

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', changeOverlay);
  }
};

// ----------------
// Overlay selector
// ----------------

const overlaySelector = function() {
  const selector = document.createElement('div');
  selector.classList.add('selector');
  selector.innerHTML = `
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="#e9ede1" d="M10,4V8H14V4H10M16,4V8H20V4H16M16,10V14H20V10H16M16,16V20H20V16H16M14,20V16H10V20H14M8,20V16H4V20H8M8,14V10H4V14H8M8,8V4H4V8H8M10,14H14V10H10V14M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4C2.92,22 2,21.1 2,20V4A2,2 0 0,1 4,2Z" />
    </svg>

    <div class="selector__popout">
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map1">Map 1 - Green Pasture</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map2">Map 2 - Lost Desert</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map3">Map 3 - Snow Trap</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map4">Map 4 - Lava or Leave It</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map5">Map 5 - Wandering Fields</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map6">Map 6 - Dune Gauntlet</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map7">Map 7 - Double Trouble</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map8">Map 8 - Arid Junction</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map9">Map 9 - Frozen Steppes</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="mapSelect">Map select screen</button>
    </div>
  `;

  channelPageVideoPlayer.appendChild(selector);
  overlaySelectorEvents();
};

// ------------
// Init overlay
// ------------

const initOverlay = function() {
  const findDiv = setInterval(function() {
    channelPageVideoPlayer = document.querySelector('.channel-page__video-player');

    if (channelPageVideoPlayer) {
      generateOverlay();
      clearInterval(findDiv);
    }
  }, 1000);
}

export {initOverlay};