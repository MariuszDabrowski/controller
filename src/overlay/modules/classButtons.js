import {sendCommand} from './sendCommand';
import {updateTowerMoveControls} from './towerOverlays';
import {updatePowerButtons} from './powerButtons';

let activeClasses = [];

// --------
// Template
// --------

function initClassButtons() {
  const container = document.createElement('div');
  container.classList.add('class-buttons');
  container.innerHTML = `
    <div class="class-buttons__container">
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-class="archer" data-command="!archer">Archer</button>
        <div class="spec">
          <button class="spec__item" data-command="!specbowman">Bowman</button>
          <button class="spec__item" data-command="!specsniper">Sniper</button>
          <button class="spec__item" data-command="!specgunner">Gunner</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-class="rogue" data-command="!rogue">Rogue</button>
        <div class="spec">
          <button class="spec__item" data-command="!specknifethrower">Knife Thrower</button>
          <button class="spec__item" data-command="!specassassin">Assassin</button>
          <button class="spec__item" data-command="!specninja">Ninja</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-class="firemage" data-command="!firemage">Firemage</button>
        <div class="spec">
          <button class="spec__item" data-command="!specpyromancer">Pyromancer</button>
          <button class="spec__item" data-command="!specarcanist">Arcanist</button>
          <button class="spec__item" data-command="!specsaboteur">Saboteur</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-class="timemage" data-command="!timemage">Timemage</button>
        <div class="spec">
          <button class="spec__item" data-command="!specicemage">Icemage</button>
          <button class="spec__item" data-command="!spectrickster">Trickster</button>
          <button class="spec__item" data-command="!speclightningmage">Lightning Mage</button>
          <button class="spec__item" data-command="!specshockmage">Shock Mage</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-class="poisoner" data-command="!poisoner">Poisoner</button>
        <div class="spec">
          <button class="spec__item" data-command="!specplaguedoctor">Plague Doctor</button>
          <button class="spec__item" data-command="!specundeadarcher">Undead Archer</button>
          <button class="spec__item" data-command="!specdeathdealer">Deathdealer</button>
          <button class="spec__item" data-command="!specpotionmaster">Potion Master</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-class="bard" data-command="!bard">Bard</button>
        <div class="spec">
          <button class="spec__item" data-command="!specminstrel">Minstrel</button>
          <button class="spec__item" data-command="!speccommander">Commander</button>
          <button class="spec__item" data-command="!specscout">Scout</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button class="class-buttons__item__button" data-type="leave" data-command="!leave">Leave</button>
      </div>
    </div>
  `;

  window.controller.videoContainer.appendChild(container);
  clickEvents();
}

// ------------
// Click Events
// ------------

function clickEvents() {
  const buttons = document.querySelectorAll('.class-buttons__container button');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      let command = this.getAttribute('data-command');
      
      // Clicked on a class
      if (this.getAttribute('data-class')) {
        const className = this.getAttribute('data-class');
        const classIndex = activeClasses.indexOf(className);

        if (classIndex < 0) {
          activeClasses.push(className);
          this.classList.add('class-buttons__item__button--active');
        } else {
          activeClasses.splice(classIndex, 1);
          this.classList.remove('class-buttons__item__button--active');
          command = `${className[0]}!leave`;
        }

        classesUpdated();
      }

      // Clicked on the clear classes button
      if (this.getAttribute('data-type') === 'leave') {
        const activeButtons = document.querySelectorAll('.class-buttons__item__button--active');
        for (let i = 0; i < activeButtons.length; i++) {
          activeButtons[i].classList.remove('class-buttons__item__button--active');
        }
        activeClasses = [];
        classesUpdated();
      }

      // If the button had a command
      if (command) {
        sendCommand(command); 
      }
    });
  }
};

// ---------------
// Classes updated
// ---------------

function classesUpdated() {
  window.controller.activeClasses = activeClasses;
  updateTowerMoveControls();
  updatePowerButtons();
}

export default initClassButtons;