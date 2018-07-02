'use strict';

(function() {
  let opacity = window.controller.opacity;
  let popups = window.controller.popups;

  popups = {
    popupDivs: document.querySelectorAll('.popup'),
    popupButtons: document.querySelectorAll('[data-button="popup"]'),
    settingsOpen: false,
    init: function() {
      for (let i = 0; i < popups.popupButtons.length; i++) {
        popups.popupButtons[i].addEventListener('click', popups.togglePopup);
      }
    },
    togglePopup: function() {
      if (!window.controller.dragging) {
        const popupTarget = this.getAttribute('data-popup-target');
        const popup = document.querySelector(`[data-popup="${popupTarget}"]`);

        if (!popup.classList.contains('popup--active')) {
          popups.clearPopupClasses();
          popup.classList.add('popup--active');
          this.classList.add('additional-options__item--active');
          if (popupTarget === 'settings') {
            opacity.init();
          }
        } else {
          popup.classList.remove('popup--active');
          this.classList.remove('additional-options__item--active');
        }

        window.controller.updateDragDisablers();
      }
      window.controller.dragging = false;
    },
    clearPopupClasses: function() {
      for (let i = 0; i < popups.popupDivs.length; i++) {
        popups.popupButtons[i].classList.remove('additional-options__item--active');
        popups.popupDivs[i].classList.remove('popup--active');
      }
    }
  }

  popups.init();
})();