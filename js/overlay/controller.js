'use strict';

(function() {  
  window.controller.init = function() {
    window.controller.renderUI.init();
    window.controller.accountList.init();
    window.controller.dragAndScale.init();
    window.controller.popups.init();
  };

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === 'connect') {
        if (!window.controller.connected) { 
          window.controller.connected = true;
          window.controller.init();
          window.controller.overlayDiv.classList.add('overlay--active');
          sendResponse({action: 'connect'});
        }
      }
    }
  );
})();