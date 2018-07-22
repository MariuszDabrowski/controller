import {generateTowers, clearTowerOverlays} from './towerOverlays';
import positions from './positions';

// -----------------------
// Overlay selector events
// -----------------------

const overlaySelectorEvents = function() {
  const clearButton = document.querySelector('[data-button="overlay-clear"]');
  const buttons = document.querySelectorAll('[data-button="overlay-change"]');
  const changeOverlay = function() {
    clearTowerOverlays();
    generateTowers(positions[this.getAttribute('data-overlay')]);
  };

  clearButton.addEventListener('click', clearTowerOverlays);

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', changeOverlay);
  }
};

// ----------------
// Overlay selector
// ----------------

const overlaySelector = function() {
  const selector = document.createElement('div');
  selector.classList.add('selector');
  selector.innerHTML = `
    <div class="selector__popout">
      <button class="selector__popout__item" data-button="overlay-clear">Clear overlays</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map1">Map 1 - Green Pasture</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map2">Map 2 - Lost Desert</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map3">Map 3 - Snow Trap</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map4">Map 4 - Lava or Leave It</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map5">Map 5 - Wandering Fields</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map6">Map 6 - Dune Gauntlet</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map7">Map 7 - Double Trouble</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map8">Map 8 - Arid Junction</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map9">Map 9 - Frozen Steppes</button>
    </div>
  `;

  window.controller.videoContainer.appendChild(selector);
  overlaySelectorEvents();
};

export {overlaySelector};