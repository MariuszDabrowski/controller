import {sendCommand} from './sendCommand';

const buttonEvents = function() {
  const buttons = document.querySelectorAll('.power-buttons [data-button="command"]');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      const command = this.getAttribute('data-command');
      sendCommand(command);
    });
  }
};

const initPowerButtons = function() {
  const container = document.createElement('div');
  container.classList.add('power-buttons');
  container.innerHTML = `
    <button class="power-buttons__item" data-button="command" data-command="!p">Power Up</button>
    <button class="power-buttons__item" data-button="command" data-command="!pd">Power Down</button>
  `;

  window.controller.videoContainer.appendChild(container);
  buttonEvents();
}

export default initPowerButtons;