const initPowerButtons = function() {
  const container = document.createElement('div');
  container.classList.add('power-buttons');
  container.innerHTML = `
    <button class="power-buttons__item" data-button="command" data-command="!p">Power Up</button>
    <button class="power-buttons__item" data-button="command" data-command="!pd">Power Down</button>
  `;

  window.controller.videoContainer.appendChild(container);
}

export default initPowerButtons;