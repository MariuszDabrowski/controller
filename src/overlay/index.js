import {
  initUI,
  initButtons,
  initTabs,
  initNoDragItems,
  initOpacitySwtich,
  initUserListToggle,
  initCloseController
} from './modules/initUI';
import initDragAndScale from './modules/dragAndScale';
import {getData} from './../popup/modules/data';
import {initUserList} from './../popup/modules/userList';
import {initAccountList} from './modules/accountList';

// -----------
// Application
// -----------

window.controller = {
  overlay: null,
  dragging: false,
  channel: 'dongerlistdotcom',
  users: {}
};

initUI();
initUserListToggle();
initButtons();
initTabs();
initCloseController();
initNoDragItems();
initOpacitySwtich();
initDragAndScale();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if (request.action === 'connect') {
      getData('users', initAccountList);
      // initAccountList(users);
    
      // window.controller.overlayDiv.classList.add('overlay--active');
      // sendResponse({action: 'connect'});
    }
  }
);