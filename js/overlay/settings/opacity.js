'use strict';

(function() {
  let opacity = window.controller.opacity = {
    slider: null,
    opacity: 100,
    init: function() {
      opacity.slider = document.querySelector('[data-item="opacity-slider"]');
      opacity.slider.addEventListener('input', opacity.updateOpacity);
    },
    updateOpacity: function() {
      window.controller.overlayDiv.style.opacity = opacity.slider.value/100;
    }
  };
})();