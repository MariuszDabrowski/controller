import {getData} from '../popup/modules/data.js';
import {sendCommand} from './modules/sendCommand';
import {initAccountList, populateUsers} from './modules/accountList';
import initOverlayContainers from './modules/initOverlayContainers'; 
import initPowerButtons from './modules/powerButtons';
import initMercButtons from './modules/mercButtons';
import initClassButtons from './modules/classButtons';
import {initResizeTriggers, resizeOverlays} from './modules/resizeOverlays';
import {overlaySelector} from './modules/overlaySelector';
import {customActions} from './modules/customActions';
import {leave} from './modules/leave';
import {initTtdbot} from './modules/ttdbot';

// -----------
// Application
// -----------

window.controller = {
  video: null,
  videoWrapper: null,
  videoContainer: null,
  channel: 'dongerlistdotcom',
  users: {},
  overlayActive: false
};

const initOverlay = function() {
  if (!window.controller.overlayActive) {
    const findDiv = setInterval(function() {
      window.controller.video = document.querySelector('.video-player__container');
      document.body.classList.add('overlay-active');
  
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
        leave();
        initTtdbot();
        
        const buttons = document.querySelectorAll('[data-button="command"]');
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].addEventListener('click', function() {
            const command = this.getAttribute('data-command');
            sendCommand(command);
          });
        }

        getData('users', populateUsers);
        clearInterval(findDiv);
      }
    }, 1000);

    window.controller.overlayActive = true;
  } else {
    getData('users', populateUsers);
  }
};

// initOverlay();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'connect') {
      initOverlay();
      console.log('connect');
    }

    if (request.action === 'disconnect') {
      console.log('disconnect');
      document.body.classList.remove('overlay-active');
      window.controller.videoWrapper.remove();

      window.controller = {
        video: null,
        videoWrapper: null,
        videoContainer: null,
        channel: 'archonthewizard',
        users: {},
        overlayActive: false
      };
    }

    if (request.action === 'checkStatus') {
      sendResponse({status: window.controller.overlayActive});
    }
  }
);