import {sendCommand} from './sendCommand'

function initVoting() {
  const template = document.createElement('div');
  template.classList.add('voting-options');
  template.innerHTML = `
    <div class="voting-options__item">
      <div class="voting-button" data-command="!vote1">Vote 1</div>
    </div>
    <div class="voting-options__item">
      <div class="voting-button" data-command="!vote2">Vote 2</div>
    </div>
  `;

  window.controller.videoContainer.appendChild(template);
  votingClickEvents();
}

function votingClickEvents() {
  const votingButtons = document.querySelectorAll('.voting-options [data-command]');

  votingButtons.forEach(button => {
    button.addEventListener('click', function() {
      const command = this.getAttribute('data-command');
      sendCommand(command);
    });
  });
}

export default initVoting;