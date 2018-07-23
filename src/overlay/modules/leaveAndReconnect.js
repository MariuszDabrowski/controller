import sendCommand from './sendCommand';
import initMercButtons from './mercButtons';

const initButons = function() {
  const leave = document.querySelector('[data-button="leave"]');
  const reconnect = document.querySelector('[data-button="reconnect"]');

  leave.addEventListener('click', function() {
    sendCommand(this.getAttribute('data-command'));
  });

  reconnect.addEventListener('click', function() {
    sendCommand(this.getAttribute('data-command'));
  });
};

const leaveAndReconnect = function() {
  const container = document.createElement('div');
  container.classList.add('leave-reconnect');
  container.innerHTML = `
  <button class="leave-reconnect__button" data-button="leave" data-command="!leave">Leave</button>
  <button class="leave-reconnect__button" data-button="reconnect" data-command="!">Reconnect</button>
  `;

  window.controller.videoContainer.appendChild(container);
  initButons();
};

export {leaveAndReconnect};