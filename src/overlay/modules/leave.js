import {sendCommandFromAll} from './sendCommand';
import {destroyTowerSpells} from './towerSpells';
import isHighpriestActive from '../helpers/isHighpriestActive';

const initButons = function() {
  const leave = document.querySelector('[data-button="leave"]');

  leave.addEventListener('click', function() {
    sendCommandFromAll(this.getAttribute('data-command'), function(user) {
      user.class = null;
    });

    if (!isHighpriestActive()) {
      destroyTowerSpells();
    }
  });
};

const leave = function() {
  const container = document.createElement('div');
  container.classList.add('leave');
  container.innerHTML = `
  <button class="leave__button" data-button="leave" data-command="!leave">Leave</button>
  `;

  window.controller.videoContainer.appendChild(container);
  initButons();
};

export {leave};