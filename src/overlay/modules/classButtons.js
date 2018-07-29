const initClassButtons = function () {
  const container = document.createElement('div');
  container.classList.add('class-buttons');
  container.innerHTML = `
    <div class="class-buttons__container">
      <div class="class-buttons__item">
        <button className="class-buttons__item__button" data-button="command" data-command="!archer">Archer</button>
        <div class="spec">
          <button class="spec__item" data-button="command" data-command="!specbowman">Bowman</button>
          <button class="spec__item" data-button="command" data-command="!specsniper">Sniper</button>
          <button class="spec__item" data-button="command" data-command="!specgunner">Gunner</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button className="class-buttons__item__button" data-button="command" data-command="!rogue">Rogue</button>
        <div class="spec">
          <button class="spec__item" data-button="command" data-command="!specknifethrower">Knife Thrower</button>
          <button class="spec__item" data-button="command" data-command="!specassassin">Assassin</button>
          <button class="spec__item" data-button="command" data-command="!specninja">Ninja</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button className="class-buttons__item__button" data-button="command" data-command="!firemage">Firemage</button>
        <div class="spec">
          <button class="spec__item" data-button="command" data-command="!specpyromancer">Pyromancer</button>
          <button class="spec__item" data-button="command" data-command="!specbombermage">Bomber Mage</button>
          <button class="spec__item" data-button="command" data-command="!specsaboteur">Saboteur</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button className="class-buttons__item__button" data-button="command" data-command="!frostmage">Frostmage</button>
        <div class="spec">
          <button class="spec__item" data-button="command" data-command="!specicemage">Icemage</button>
          <button class="spec__item" data-button="command" data-command="!spectrickster">Trickster</button>
          <button class="spec__item" data-button="command" data-command="!speclightningmage">Lightning Mage</button>
          <button class="spec__item" data-button="command" data-command="!specshockmage">Shock Mage</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button className="class-buttons__item__button" data-button="command" data-command="!alchemist">Alchemist</button>
        <div class="spec">
          <button class="spec__item" data-button="command" data-command="!specplaguedoctor">Plague Doctor</button>
          <button class="spec__item" data-button="command" data-command="!specundeadarcher">Undead Archer</button>
          <button class="spec__item" data-button="command" data-command="!specdeathdealer">Deathdealer</button>
          <button class="spec__item" data-button="command" data-command="!specpotionmaster">Potion Master</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button className="class-buttons__item__button" data-button="command" data-command="!bard">Bard</button>
        <div class="spec">
          <button class="spec__item" data-button="command" data-command="!specminstrel">Minstrel</button>
          <button class="spec__item" data-button="command" data-command="!speccommander">Commander</button>
          <button class="spec__item" data-button="command" data-command="!specscout">Scout</button>
        </div>
      </div>
      <div class="class-buttons__item">
        <button className="class-buttons__item__button" data-button="command" data-command="!trapper">Trapper</button>
      </div>
      <div class="class-buttons__item">
        <button className="class-buttons__item__button" data-button="command" data-command="!highpriest">Highpriest</button>
      </div>
    </div>
  `;

  window.controller.videoContainer.appendChild(container);
}

export default initClassButtons;