import {sendCommandFromAll} from './sendCommand';
import {initTowerSpells, updateTowerSpells, destroyTowerSpells} from './towerSpells';
import isHighpriestActive from '../helpers/isHighpriestActive';

const towerSpells = function(command) {
  if (command.replace('!', '') === 'highpriest') {
    if (!window.controller.towerSpellsActive) {
      initTowerSpells();
    } else {
      updateTowerSpells();
    }
  } else if (!isHighpriestActive() && window.controller.towerSpellsActive) {
    destroyTowerSpells();
  }
};

const classEvents = function() {
  const buttons = document.querySelectorAll('.class-buttons [data-button="pickClass"]');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      const command = this.getAttribute('data-command');
      sendCommandFromAll(command, function(user) {
        user.class = command.replace('!', '');
        user.updatedStats();
      });

      towerSpells(command);
    });
  }
};

const specEvents = function() {
  const buttons = document.querySelectorAll('.class-buttons [data-button="changeSpec"]');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      const command = this.getAttribute('data-command');
      sendCommandFromAll(command, function(user) {
        const spec = command.replace('!spec', '');
        user.tempMemory = {
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
        <button class="class-buttons__item__button" data-button="pickClass" data-command="!archer">Archer</button>
        <div class="spec">
          <button class="spec__item" data-button="changeSpec" data-command="!specbowman">Bowman</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specsniper">Sniper</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specgunner">Gunner</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-button="pickClass" data-command="!rogue">Rogue</button>
        <div class="spec">
          <button class="spec__item" data-button="changeSpec" data-command="!specknifethrower">Knife Thrower</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specassassin">Assassin</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specninja">Ninja</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-button="pickClass" data-command="!firemage">Firemage</button>
        <div class="spec">
          <button class="spec__item" data-button="changeSpec" data-command="!specpyromancer">Pyromancer</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specbombermage">Bomber Mage</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specsaboteur">Saboteur</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-button="pickClass" data-command="!frostmage">Frostmage</button>
        <div class="spec">
          <button class="spec__item" data-button="changeSpec" data-command="!specicemage">Icemage</button>
          <button class="spec__item" data-button="changeSpec" data-command="!spectrickster">Trickster</button>
          <button class="spec__item" data-button="changeSpec" data-command="!speclightningmage">Lightning Mage</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specshockmage">Shock Mage</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-button="pickClass" data-command="!alchemist">Alchemist</button>
        <div class="spec">
          <button class="spec__item" data-button="changeSpec" data-command="!specplaguedoctor">Plague Doctor</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specundeadarcher">Undead Archer</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specdeathdealer">Deathdealer</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specpotionmaster">Potion Master</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-button="pickClass" data-command="!bard">Bard</button>
        <div class="spec">
          <button class="spec__item" data-button="changeSpec" data-command="!specminstrel">Minstrel</button>
          <button class="spec__item" data-button="changeSpec" data-command="!speccommander">Commander</button>
          <button class="spec__item" data-button="changeSpec" data-command="!specscout">Scout</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-button="pickClass" data-command="!trapper">Trapper</button>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-button="pickClass" data-command="!highpriest">Highpriest</button>
      </div>
    </div>
  `;

  window.controller.videoContainer.appendChild(container);
  classEvents();
  specEvents();
}

export default initClassButtons;