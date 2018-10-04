import {sendCommand} from './sendCommand';
import User from './User';

const classEvents = function() {
  const buttons = document.querySelectorAll('.class-buttons [data-button="pickClass"]');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      const command = this.getAttribute('data-command');
      sendCommand(command, function() {
        window.controller.user.class = command.replace('!', '');
        window.controller.user.updatedStats();
      });
    });
  }
};

const specEvents = function() {
  const buttons = document.querySelectorAll('.class-buttons [data-button="changeSpec"]');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      const command = this.getAttribute('data-command');
      sendCommand(command, function() {
        const spec = command.replace('!spec', '');
        window.controller.user.tempMemory = {
          class: buttons[i].parentElement.parentElement.querySelector('[data-button="pickClass"]').getAttribute('data-command').replace('!', ''),
          spec: spec
        };
      });
    });
  }
};

const initClassButtons = function () {
  const container = document.createElement('div');
  container.classList.add('class-buttons');
  container.innerHTML = `
    <div class="class-buttons__container">
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-button="pickClass" data-class="archer" data-command="!archer">Archer</button>
        <div class="spec">
          <button class="spec__item" data-button="changeSpec" data-command="!specbowman">Bowman</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specsniper">Sniper</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specgunner">Gunner</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-button="pickClass" data-class="rogue" data-command="!rogue">Rogue</button>
        <div class="spec">
          <button class="spec__item" data-button="changeSpec" data-command="!specknifethrower">Knife Thrower</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specassassin">Assassin</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specninja">Ninja</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-button="pickClass" data-class="firemage" data-command="!firemage">Firemage</button>
        <div class="spec">
          <button class="spec__item" data-button="changeSpec" data-command="!specpyromancer">Pyromancer</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specbombermage">Bomber Mage</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specsaboteur">Saboteur</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-button="pickClass" data-class="timemage" data-command="!timemage">Timemage</button>
        <div class="spec">
          <button class="spec__item" data-button="changeSpec" data-command="!specicemage">Icemage</button>
          <button class="spec__item" data-button="changeSpec" data-command="!spectrickster">Trickster</button>
          <button class="spec__item" data-button="changeSpec" data-command="!speclightningmage">Lightning Mage</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specshockmage">Shock Mage</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-button="pickClass" data-class="poisoner" data-command="!poisoner">Poisoner</button>
        <div class="spec">
          <button class="spec__item" data-button="changeSpec" data-command="!specplaguedoctor">Plague Doctor</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specundeadarcher">Undead Archer</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specdeathdealer">Deathdealer</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specpotionmaster">Potion Master</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-button="pickClass" data-class="bard" data-command="!bard">Bard</button>
        <div class="spec">
          <button class="spec__item" data-button="changeSpec" data-command="!specminstrel">Minstrel</button>
          <button class="spec__item" data-button="changeSpec" data-command="!speccommander">Commander</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specscout">Scout</button>
        </div>
      </div>
    </div>
  `;

  window.controller.videoContainer.appendChild(container);
  classEvents();
  specEvents();
}

export default initClassButtons;