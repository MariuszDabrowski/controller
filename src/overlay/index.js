import {getData} from '../popup/modules/data.js';
import initUser from './modules/initUser';
import createVideoOverlay from './modules/createVideoOverlay'; 
import {initFactionSelect} from './modules/factionSelect';
import {initPowerButtons} from './modules/powerButtons';
import {initClassButtons} from './modules/classButtons';
import {initResizeTriggers, resizeOverlays} from './modules/resizeOverlays';
import {overlaySelector} from './modules/overlaySelector';
import {customActions} from './modules/customActions';
import {toggleVisibilityUI} from './modules/toggleControllerVisibility';

// Listen to the Chrome extentions for commands (Connect, Disconnect)
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // -------
    // Connect
    // -------

    if (request.action === 'connect') {
      window.controller = {
        video: null,
        videoWrapper: null,
        videoContainer: null,
        channel: 'dongerlistdotcom',
        // channel: 'archonthewizard',
        user: null,
        activeClasses: [],
        highpriest: false,
        overlayActive: false,
        activeMap: null
      };

      initOverlay();
    }

    // ----------
    // Disconnect
    // ----------

    if (request.action === 'disconnect') {
      document.body.classList.remove('overlay-active');
      window.controller.videoWrapper.remove();
      window.controller = null;
    }

    // When you open the chrome extension, see if the video overlay is active or not
    if (request.action === 'checkStatus') {
      sendResponse({status: window.controller.overlayActive});
    }
  }
);

function initOverlay() {
  if (!window.controller.overlayActive) {
    const findDiv = setInterval(function() {
      window.controller.video = document.querySelector('.video-player__container');
      document.body.classList.add('overlay-active');
  
      if (window.controller.video) {
        createVideoOverlay();
        initResizeTriggers();
        resizeOverlays();
        overlaySelector();
        initFactionSelect();
        initPowerButtons();
        initClassButtons();
        customActions();
        toggleVisibilityUI();
        getData('user', initUser);
        clearInterval(findDiv);
      }
    }, 1000);

    window.controller.overlayActive = true;
  } else {
    getData('user', initUser);
  }
};