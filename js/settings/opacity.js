'use strict';

(function() {
  let opacity = window.controller.opacity = {
    slider: document.querySelector('[data-item="opacity-slider"]'),
    opacity: 100,
    init: function() {
      opacity.slider.addEventListener('input', opacity.updateOpacity);
    },
    updateOpacity: function() {
      window.controller.overlay.style.opacity = opacity.slider.value/100;
    }
  };
})();