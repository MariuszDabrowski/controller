import {updateTowerMoveControls, generateTowers, clearTowerOverlays} from './towerOverlays';
import positions from './positions';

// -----------------------
// Overlay selector events
// -----------------------

const overlaySelectorEvents = function() {
  const clearButton = document.querySelector('[data-button="overlay-clear"]');
  const buttons = document.querySelectorAll('[data-button="overlay-change"]');
  const hideDashesCheckbox = document.querySelector('[data-input="hide-dashes"]');
  const changeOverlay = function() {
    if (window.controller.activeMap) window.controller.activeMap.classList.remove('selector__popout__item--active');
    this.classList.add('selector__popout__item--active');
    window.controller.activeMap = this;

    clearTowerOverlays();
    generateTowers(positions[this.getAttribute('data-overlay')]);
    updateTowerMoveControls();
  };

  clearButton.addEventListener('click', resetActiveMap);

  hideDashesCheckbox.addEventListener('click', function() {
    if (this.checked) {
      window.controller.videoContainer.classList.add('video-container--hide-dashes');
    } else {
      window.controller.videoContainer.classList.remove('video-container--hide-dashes');
    }
  });

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', changeOverlay);
  }
};

function resetActiveMap() {
  if (window.controller.activeMap) window.controller.activeMap.classList.remove('selector__popout__item--active');
  window.controller.activeMap = null;
  clearTowerOverlays();
  updateTowerMoveControls();
}

// ----------------
// Overlay selector
// ----------------

const overlaySelector = function() {
  const selector = document.createElement('div');
  selector.classList.add('selector');
  selector.innerHTML = `
    <div class="selector__button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </div>
    <div class="selector__popout">
      <label for="hide-dashes" class="selector__popout__item selector__popout__item--hide-dashes"><input type="checkbox" id="hide-dashes" data-input="hide-dashes" />Hide dashed outlines</label>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map8">Arid Junction</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map10">Cursed Sands</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map7">Double Trouble</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map6">Dune Gauntlet</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map9">Frozen Steppes</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map1">Green Pasture</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map4">Lava or Leave It</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map2">Lost Desert</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map3">Snow Trap</button>
      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map5">Wandering Fields</button>
      <button class="selector__popout__item selector__popout__item--clear" data-button="overlay-clear">Clear overlays</button>
    </div>
  `;

  window.controller.videoContainer.appendChild(selector);
  overlaySelectorEvents();
};

export {overlaySelector, resetActiveMap};