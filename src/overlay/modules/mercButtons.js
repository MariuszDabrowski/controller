import {sendCommandFromAll} from './sendCommand';

const buttonEvents = function() {
  const buttons = document.querySelectorAll('.merc-buttons [data-button="command"]');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      const command = this.getAttribute('data-command');
      sendCommandFromAll(command);
    });
  }
};

const initMercButtons = function() {
  const container = document.createElement('div');
  container.classList.add('merc-buttons');
  container.innerHTML = `
    <div class="merc-buttons__container">
      <button class="merc-buttons__item" data-button="command" data-command="!hireicelo">Icelo</button>
      <button class="merc-buttons__item" data-button="command" data-command="!hireshade">Shade</button>
      <button class="merc-buttons__item" data-button="command" data-command="!hirejubal">Jubal</button>
      <button class="merc-buttons__item" data-button="command" data-command="!hiregunnar">Gunnar</button>
      <button class="merc-buttons__item" data-button="command" data-command="!hireadara">Adara</button>
      <button class="merc-buttons__item" data-button="command" data-command="!hiremoor">Moor</button>
      <button class="merc-buttons__item" data-button="command" data-command="!hirecortez">Cortez</button>
      <button class="merc-buttons__item" data-button="command" data-command="!hiremolan">Molan</button>
    </div>
  `;

  window.controller.videoContainer.appendChild(container);
  buttonEvents();
}

export default initMercButtons;