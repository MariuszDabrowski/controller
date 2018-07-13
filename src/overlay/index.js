import {
  initUI,
  initButtons,
  initTabs,
  initNoDragItems,
  initOpacitySwtich,
  initUserListToggle,
  initCloseController,
  overlayShow,
  initMapVotes
} from './modules/initUI';
import initDragAndScale from './modules/dragAndScale';
import {getData} from './../popup/modules/data';
import {initUserList} from './../popup/modules/userList';
import {initAccountList} from './modules/accountList';
import {initOverlay} from './modules/videoOverlay';

// -----------
// Application
// -----------

window.controller = {
  overlay: null,
  overlayActive: false,
  dragging: false,
  channel: 'archonthewizard',
  mapVotes: '',
  users: {}
};

initOverlay();
initUI();
initUserListToggle();
initButtons();
initTabs();
initCloseController();
initNoDragItems();
initOpacitySwtich();
initDragAndScale();
initMapVotes();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'connect') {
      overlayShow();
      getData('users', initAccountList);
    }
  }
);