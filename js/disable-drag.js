'use strict';

(function() {
  
  window.controller.updateDragDisablers = function() {
    const diableDragItems = document.querySelectorAll('[data-drag="disabled"]');

    for (let i = 0; i < diableDragItems.length; i++) {
      diableDragItems[i].addEventListener('mouseenter', disableDragging);
      diableDragItems[i].addEventListener('mouseleave', enableDragging);
    }

    function disableDragging() {
      window.controller.draggingDisabled = true;
    }
    
    function enableDragging() {
      window.controller.draggingDisabled = false;
    }
  }
  
  window.controller.updateDragDisablers();
})();