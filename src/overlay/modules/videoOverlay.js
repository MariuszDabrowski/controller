import sendCommand from './sendCommand';

let channelPageVideoPlayer = null;
let overlayContainers = null;
let resizeTimer;

// width: 163,
// height: 278,

// 1000
// 562

let towers = [];
let towerElements = [];
const positions = {
  map1: {
    tower1: {top: '32.9181495%', left: '23%', command: '!1'},
    tower2: {top: '57.6512456%', left: '23%', command: '!2'},
    tower3: {top: '25.088968%', left: '34.4%', command: '!3'},
    tower4: {top: '48.7544484%', left: '34.4%', command: '!4'},
    tower5: {top: '17.9715302%', left: '45.6%', command: '!5'},
    tower6: {top: '48.7544484%', left: '45.6%', command: '!6'},
    tower7: {top: '17.9715302%', left: '56.9%', command: '!7'},
    tower8: {top: '43.0604982%', left: '56.9%', command: '!8'},
    tower9: {top: '32.9181495%', left: '68.4%', command: '!9'},
    tower10: {top: '63.1672598%', left: '68.4%', command: '!10'},
    tower11: {top: '39.5017794%', left: '79.4%', command: '!11'},
    tower12: {top: '63.1672598%', left: '79.4%', command: '!12'},
    train: {top: '13.3451957%', left: '83.3%', width: '16.8%', height: '26.3345196%', command: '!train'}
  },
  map2: {
    tower1: {top: '35.5239787%', left: '80.4%', command: '!1'},
    tower2: {top: '25.9325044%', left: '69.4%', command: '!2'},
    tower3: {top: '22.0248668%', left: '58%', command: '!3'},
    tower4: {top: '27.1758437%', left: '47.1%', command: '!4'},
    tower5: {top: '23.8010657%', left: '35.4%', command: '!5'},
    tower6: {top: '27.1758437%', left: '23.8%', command: '!6'},
    tower7: {top: '53.4635879%', left: '27.5%', command: '!7'},
    tower8: {top: '64.2984014%', left: '35.4%', command: '!8'},
    tower9: {top: '64.2984014%', left: '46.5%', command: '!9'},
    tower10: {top: '60.3907638%', left: '58%', command: '!10'},
    tower11: {top: '64.2984014%', left: '69.4%', command: '!11'},
    tower12: {top: '64.2984014%', left: '80.4%', command: '!12'},
    train: {top: '13.1438721%', left: '83.3%', width: '16.8%', height: '26.3345196%', command: '!train'},
    altar: {width: '10.6%', height: '20.6039076%', top: '13.1438721%', left: '7.5%', command: '!altar'}
  },
  map3: {
    tower1: {top: '43.1616341%', left: '14.8%', command: '!1'},
    tower2: {top: '14.7424512%', left: '26.8%', command: '!2'},
    tower3: {top: '43.1616341%', left: '26.8%', command: '!3'},
    tower4: {top: '67.1403197%', left: '26.8%', command: '!4'},
    tower5: {top: '71.7584369%', left: '39.2%', command: '!5'},
    tower6: {top: '43.1616341%', left: '39.2%', command: '!6'},
    tower7: {top: '19.5381883%', left: '39.2%', command: '!7'},
    tower8: {top: '67.1403197%', left: '51.6%', command: '!8'},
    tower9: {top: '43.1616341%', left: '51.6%', command: '!9'},
    tower10: {top: '14.7424512%', left: '51.6%', command: '!10'},
    tower11: {top: '19.5381883%', left: '63.9%', command: '!11'},
    tower12: {top: '52.7531083%', left: '63.9%', command: '!12'},
    train: {top: '13.4991119%', left: '84.4%', width: '15.6%', height: '24.5115453%', command: '!train'}
  },
  map4: {
    tower1: {top: '0%', left: '0%', command: '!1'},
    tower2: {top: '0%', left: '0%', command: '!2'},
    tower3: {top: '0%', left: '0%', command: '!3'},
    tower4: {top: '0%', left: '0%', command: '!4'},
    tower5: {top: '0%', left: '0%', command: '!5'},
    tower6: {top: '0%', left: '0%', command: '!6'},
    tower7: {top: '0%', left: '0%', command: '!7'},
    tower8: {top: '0%', left: '0%', command: '!8'},
    tower9: {top: '0%', left: '0%', command: '!9'},
    tower10: {top: '0%', left: '0%', command: '!10'},
    tower11: {top: '0%', left: '0%', command: '!11'},
    tower12: {top: '0%', left: '0%', command: '!12'},
    train: {top: '0%', left: '0%', width: '0%', height: '0%', command: '!train'}
  },
  map5: {
    tower1: {top: '0%', left: '0%', command: '!1'},
    tower2: {top: '0%', left: '0%', command: '!2'},
    tower3: {top: '0%', left: '0%', command: '!3'},
    tower4: {top: '0%', left: '0%', command: '!4'},
    tower5: {top: '0%', left: '0%', command: '!5'},
    tower6: {top: '0%', left: '0%', command: '!6'},
    tower7: {top: '0%', left: '0%', command: '!7'},
    tower8: {top: '0%', left: '0%', command: '!8'},
    tower9: {top: '0%', left: '0%', command: '!9'},
    tower10: {top: '0%', left: '0%', command: '!10'},
    tower11: {top: '0%', left: '0%', command: '!11'},
    tower12: {top: '0%', left: '0%', command: '!12'},
    train: {top: '0%', left: '0%', width: '0%', height: '0%', command: '!train'}
  },
  map6: {
    tower1: {top: '63.0550622%', left: '18.5%', command: '!1'},
    tower2: {top: '33.2149201%', left: '35.4%', command: '!2'},
    tower3: {top: '33.2149201%', left: '46.8%', command: '!3'},
    tower4: {top: '33.2149201%', left: '57.9%', command: '!4'},
    tower5: {top: '33.2149201%', left: '69.1%', command: '!5'},
    tower6: {top: '38.0106572%', left: '80.5%', command: '!6'},
    tower7: {top: '63.0550622%', left: '29.7%', command: '!7'},
    tower8: {top: '63.0550622%', left: '38.7%', command: '!8'},
    tower9: {top: '68.2060391%', left: '49.4%', command: '!9'},
    tower10: {top: '68.2060391%', left: '57.9%', command: '!10'},
    tower11: {top: '63.0550622%', left: '69.1%', command: '!11'},
    tower12: {top: '63.0550622%', left: '80.5%', command: '!12'},
    train: {top: '13.4991119%', left: '84.4%', width: '15.6%', height: '24.5115453%', command: '!train'},
    altar: {width: '7.9%', height: '23.8010657%', top: '25.7548845%', left: '11.6%', command: '!altar'}
  },
  map7: {
    tower1: {top: '21.8472469%', left: '25.6%', command: '!1'},
    tower2: {top: '72.2912966%', left: '81%', command: '!2'},
    tower3: {top: '49.5559503%', left: '26.2%', command: '!3'},
    tower4: {top: '64.2984014%', left: '71.1%', command: '!4'},
    tower5: {top: '64.2984014%', left: '15%', command: '!5'},
    tower6: {top: '40.6749556%', left: '71.1%', command: '!6'},
    tower7: {top: '64.2984014%', left: '37.9%', command: '!7'},
    tower8: {top: '57.3712256%', left: '54.4%', command: '!8'},
    tower9: {top: '40.6749556%', left: '37.9%', command: '!9'},
    tower10: {top: '28.4191829%', left: '54.4%', command: '!10'},
    tower11: {top: '16.3410302%', left: '37.9%', command: '!11'},
    tower12: {top: '13.321492%', left: '67.2%', command: '!12'},
    train: {top: '13.321492%', left: '83.3%', width: '16.8%', height: '26.2877442%', command: '!train'},
    altar: {width: '14.8%', height: '26.2877442%', top: '16.3410302%', left: '9.3%', command: '!altar'}
  },
  map8: {
    tower1: {top: '0%', left: '0%', command: '!1'},
    tower2: {top: '0%', left: '0%', command: '!2'},
    tower3: {top: '0%', left: '0%', command: '!3'},
    tower4: {top: '0%', left: '0%', command: '!4'},
    tower5: {top: '0%', left: '0%', command: '!5'},
    tower6: {top: '0%', left: '0%', command: '!6'},
    tower7: {top: '0%', left: '0%', command: '!7'},
    tower8: {top: '0%', left: '0%', command: '!8'},
    tower9: {top: '0%', left: '0%', command: '!9'},
    tower10: {top: '0%', left: '0%', command: '!10'},
    tower11: {top: '0%', left: '0%', command: '!11'},
    tower12: {top: '0%', left: '0%', command: '!12'},
    train: {top: '0%', left: '0%', width: '0%', height: '0%', command: '!train'}
  },
  map9: {
    tower1: {top: '31.0834813%', left: '17.6%', command: '!1'},
    tower2: {top: '25.9325044%', left: '26.7%', command: '!2'},
    tower3: {top: '20.7815275%', left: '35.6%', command: '!3'},
    tower4: {top: '20.7815275%', left: '46.6%', command: '!4'},
    tower5: {top: '23.9786856%', left: '57.9%', command: '!5'},
    tower6: {top: '40.8525755%', left: '68.8%', command: '!6'},
    tower7: {top: '33.7477798%', left: '81.2%', command: '!7'},
    tower8: {top: '64.4760213%', left: '80.3%', command: '!8'},
    tower9: {top: '64.4760213%', left: '66%', command: '!9'},
    tower10: {top: '68.5612789%', left: '54.7%', command: '!10'},
    tower11: {top: '58.7921847%', left: '41.1%', command: '!11'},
    tower12: {top: '58.7921847%', left: '28%', command: '!12'},
    train: {top: '13.1438721%', left: '85.2%', width: '14.8%', height: '23.268206%', command: '!train'},
    altar: {width: '10.8%', height: '19.1829485%', top: '63.2326821%', left: '13.4%', command: '!altar'}
  }
}

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

// ----------------
// Generate overlay
// ----------------

const generateOverlay = function() {
  const playerVideo = document.querySelector('.player-video');
  const videoOverlay = document.createElement('div');
  videoOverlay.classList.add('video-overlay');
  videoOverlay.innerHTML = `
    <img src="http://via.placeholder.com/2880x1620/ff0000" alt="" class="video-overlay__img" />
  `;

  generateTowers(positions.map3);
  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('video-wrapper');
  for (let i = 0; i < towerElements.length; i++) {
    videoWrapper.appendChild(towerElements[i]);
  }
  videoOverlay.appendChild(videoWrapper);

  const videoOverlayClone = videoOverlay.cloneNode(true);
  channelPageVideoPlayer.appendChild(videoOverlay);
  playerVideo.appendChild(videoOverlayClone);
  overlayContainers = document.querySelectorAll('.video-overlay');

  initTowerClickEvents();
  initResizeTriggers();
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