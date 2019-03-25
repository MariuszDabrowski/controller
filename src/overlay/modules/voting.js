import {sendCommand} from './sendCommand'

function initVoting() {
  const template = document.createElement('div');
  template.classList.add('voting-options');
  template.innerHTML = `
    <div class="voting-options__item">
      <div class="voting-button" data-command="!vote1">Vote 1</div>
      <div class="additional-votes">
        <div class="additional-votes__item" data-command="!vote1 buy4">
          +4 extra votes
          <span class="cost cost--bottom">
            <div class="cost__price">1,000</div>
            <div class="cost__coin"></div>
          </span>
        </div>
        <div class="additional-votes__item" data-command="!vote1 buy3">
          +3 extra votes
          <span class="cost cost--bottom">
            <div class="cost__price">750</div>
            <div class="cost__coin"></div>
          </span>
        </div>
        <div class="additional-votes__item" data-command="!vote1 buy2">
          +2 extra votes
          <span class="cost cost--bottom">
            <div class="cost__price">500</div>
            <div class="cost__coin"></div>
          </span>
        </div>
        <div class="additional-votes__item" data-command="!vote1 buy1">
          +1 extra vote
          <span class="cost cost--bottom">
            <div class="cost__price">250</div>
            <div class="cost__coin"></div>
          </span>
        </div>
      </div>
    </div>
    <div class="voting-options__item">
      <div class="voting-button" data-command="!vote2">Vote 2</div>
      <div class="additional-votes">
        <div class="additional-votes__item" data-command="!vote2 buy4">
          +4 extra votes
          <span class="cost cost--bottom">
            <div class="cost__price">1,000</div>
            <div class="cost__coin"></div>
          </span>
        </div>
        <div class="additional-votes__item" data-command="!vote2 buy3">
          +3 extra votes
          <span class="cost cost--bottom">
            <div class="cost__price">750</div>
            <div class="cost__coin"></div>
          </span>
        </div>
        <div class="additional-votes__item" data-command="!vote2 buy2">
          +2 extra votes
          <span class="cost cost--bottom">
            <div class="cost__price">500</div>
            <div class="cost__coin"></div>
          </span>
        </div>
        <div class="additional-votes__item" data-command="!vote2 buy1">
          +1 extra vote
          <span class="cost cost--bottom">
            <div class="cost__price">250</div>
            <div class="cost__coin"></div>
          </span>
        </div>
      </div>
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