import {sendWhisperFromAll, sendCommandFromAll} from './sendCommand';

const clearMessage = function () {
  let clearMessageCount = 0;
  let messagePopup = null;
  const clearMessage = setInterval(function () {
    messagePopup = document.querySelector('[data-a-target="thread-close-button-ttdbot"]');
    if (messagePopup) {
      messagePopup.click();
      console.log('message should be cleared');
      clearInterval(clearMessage);
      clearMessageCount = 0;
    }

    if (clearMessageCount > 100) {
      clearInterval(clearMessage);
      clearMessageCount = 0;
    }

    clearMessageCount++;
  }, 250);
};

const initButtons = function(element) {
  const buttonsWhisper = element.querySelectorAll('[data-button="whisper"]');
  const buttonsChat = element.querySelectorAll('[data-button="chat"]');

  for (let i = 0; i < buttonsWhisper.length; i++) {
    buttonsWhisper[i].addEventListener('click', function() {
      const command = this.getAttribute('data-command');
      sendWhisperFromAll(command);
      // clearMessage();
    });
  }

  for (let i = 0; i < buttonsChat.length; i++) {
    buttonsChat[i].addEventListener('click', function() {
      const command = this.getAttribute('data-command');
      sendCommandFromAll(command);
    });
  }
};

const initTtdbot = function() {
  const element = document.createElement('div');
  element.classList.add('ttdbot');
  element.innerHTML = `
    <div class="ttdbot__dropdown">
      <button class="ttdbot__dropdown__button" data-button="whisper" data-command="!diff">Difficulty</button>
      <button class="ttdbot__dropdown__button" data-button="whisper" data-command="!essence">Essence</button>
      <button class="ttdbot__dropdown__button" data-button="whisper" data-command="!gems">Gems</button>
      <button class="ttdbot__dropdown__button" data-button="chat" data-command="!gold">Gold</button>
      <button class="ttdbot__dropdown__button" data-button="whisper" data-command="!highscores">Highscores</button>
      <button class="ttdbot__dropdown__button" data-button="whisper" data-command="!specs">Specs</button>
      <button class="ttdbot__dropdown__button" data-button="whisper" data-command="!spells">Spells</button>
      <button class="ttdbot__dropdown__button" data-button="whisper" data-command="!stats">Stats</button>
    </div>
  `;

  window.controller.videoContainer.appendChild(element);
  initButtons(element);
};

export { clearMessage, initTtdbot };