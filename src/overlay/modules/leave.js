import {sendCommand} from './sendCommand';
import initMercButtons from './mercButtons';

const initButons = function() {
  const leave = document.querySelector('[data-button="leave"]');

  leave.addEventListener('click', function() {
    sendCommand(this.getAttribute('data-command'));
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