import {getData} from '../popup/modules/data.js';
import sendCommand from './modules/sendCommand';
import {initAccountList, populateUsers} from './modules/accountList';
import initOverlayContainers from './modules/initOverlayContainers'; 
import initPowerButtons from './modules/powerButtons';
import initMercButtons from './modules/mercButtons';
import initClassButtons from './modules/classButtons';
import {initResizeTriggers, resizeOverlays} from './modules/resizeOverlays';
import {overlaySelector} from './modules/overlaySelector';
import {customActions} from './modules/customActions';

// -----------
// Application
// -----------

window.controller = {
  video: null,
  videoAlt: null,
  videoWrapper: null,
  videoContainer: null,
  channel: 'dongerlistdotcom',
  users: {},
  overlayActive: false
};

const initOverlay = function() {
  if (!window.controller.overlayActive) {
    const findDiv = setInterval(function() {
      window.controller.video = document.querySelector('.channel-page__video-player');
      window.controller.videoAlt = document.querySelector('.video-player');
  
      if (window.controller.video) {
        initOverlayContainers();
        initResizeTriggers();
        resizeOverlays();
        overlaySelector();
        initPowerButtons();
        initMercButtons();
        initClassButtons();
        initAccountList();
        customActions();
        
        const buttons = document.querySelectorAll('[data-button="command"]');
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].addEventListener('click', function() {
            const command = this.getAttribute('data-command');
            sendCommand(command);
          });
        }

        // video-player__container player theme--dark

        getData('users', populateUsers);

        // ------------------
        // Duplicate overlays
        // ------------------

        // const duplicateOverlays = function() {
        //   const playerVideo = document.querySelector('.player-video');
        //   const clone = window.controller.videoWrapper.cloneNode(true);

        //   playerVideo.appendChild(clone);
        // };

        // duplicateOverlays();

        clearInterval(findDiv);
      }
    }, 1000);

    window.controller.overlayActive = true;
  } else {
    getData('users', populateUsers);
  }
};

initOverlay();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'connect') {
      initOverlay();
    }
  }
);