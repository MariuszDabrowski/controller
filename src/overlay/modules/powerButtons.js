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

const updatePowerButtons = function() {
  const activeClasses = Object.keys(window.controller.user.activeClasses).filter(key => window.controller.user.activeClasses[key] );
  const classCombinations = [];
  if (activeClasses.length > 2) {
    for (let i = 0; i < activeClasses.length - 1; i++) {
      for (let j = i + 1; j < activeClasses.length; j++) {
        classCombinations.push(activeClasses[i][0] + activeClasses[j][0]);
      }
    }
  }
  
  const powerButtons = document.querySelector('.power-buttons');
  const classButtons = function() {
    if (activeClasses.length > 1) {
      return `
      <div class="
        power-buttons__classes
        ${(activeClasses.length === 2) ? `power-buttons__classes--2` : ``}
        ${(activeClasses.length === 3) ? `power-buttons__classes--3` : ``}
      ">
        ${activeClasses.map(item => `<button class="power-buttons__classes__item" data-button="command" data-command="${item[0]}!p">${item[0].toUpperCase()}</button>`).join('')}
        ${(activeClasses.length > 2) ? classCombinations.map(item => `<button class="power-buttons__classes__item" data-button="command" data-command="${item}!p">${item.toUpperCase()}</button>`).join('') : ""}
      </div>
      `;
    } else {
      return ``;
    };
  };

  powerButtons.innerHTML = `
    <div class="power-buttons__item">
      ${classButtons()}
      <button class="power-buttons__item__all" data-button="command" data-command="!p">Power Up</button>
    </div>
    <div class="power-buttons__item">
      ${classButtons()}
      <button class="power-buttons__item__all" data-button="command" data-command="!pd">Power Down</button>
    </div>
  `;

  buttonEvents();
};

const initPowerButtons = function() {
  const container = document.createElement('div');
  container.classList.add('power-buttons');
  container.innerHTML = `
    <div class="power-buttons__item">
      <button class="power-buttons__item__all" data-button="command" data-command="!p">Power Up</button>
    </div>
    <div class="power-buttons__item">
      <button class="power-buttons__item__all" data-button="command" data-command="!pd">Power Down</button>
    </div>
  `;

  window.controller.videoContainer.appendChild(container);
  buttonEvents();
}

export {initPowerButtons, updatePowerButtons};