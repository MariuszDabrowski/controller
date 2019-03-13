import {sendCommand} from './sendCommand';

const factions = [
  {name: 'Nomads Army', command: '!joinnomads', class: 'nomad'},
  {name: 'Elementals Army', command: '!joinelementals', class: 'elementals'},
  {name: 'Magi Order Army', command: '!joinmagiorder', class: 'magi'},
  {name: 'Wolfclan Army', command: '!joinwolfclan', class: 'wolfclan'}
];

function initFactionSelect() {
  const template = document.createElement('div');
  template.classList.add('factions-button-wrapper');
  template.innerHTML = `
    <button class="factions-button">
      <svg class="factions-button__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    </button>
    <div class="factions-list">
      ${factions.map(faction => `
        <button class="factions-list__button ${activeFactionClass(faction)}" data-command="${faction.command}">
          <span class="factions-list__button__copy">
            <span class="factions-list__button__color factions-list__button__color--${faction.class}"></span>
            ${faction.name}
          </span>
          <span class="cost cost--right">
            <div class="cost__price">2,500</div>
            <div class="cost__coin"></div>
          </span>      
        </button>
      `).join('')}
    </div>
  `;
  
  window.controller.videoContainer.appendChild(template);
  initFactionButtons();
}

function activeFactionClass(faction) {
  if (window.controller.user) {
    if (faction.name === window.controller.user.faction) {
      return 'factions-list__button--active';
    }
  }

  return '';
}

function initFactionButtons() {
  const buttons = window.controller.videoContainer.querySelectorAll('.factions-list__button');

  buttons.forEach(button => {
    const command = button.getAttribute('data-command');
    button.addEventListener('click', () => {
      sendCommand(command);
    });
  });
}

function destroyFactionSelect() {
  const factionDiv = window.controller.videoContainer.querySelector('.factions-button-wrapper');
  factionDiv.remove();
};

function updateFactionSelect() {
  destroyFactionSelect();
  initFactionSelect();
};

export {initFactionSelect, updateFactionSelect};