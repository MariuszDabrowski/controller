import {sendCommand} from './sendCommand'

// ----
// Data
// ----

let selectedClasses = [];
let selectedSorting = null;
let selectedPriorities = [];
const targeting = [
  {
    id: 'sorting',
    name: 'Sorting Option',
    details: 'Choose one',
    options: [
      {name: 'Front', command: 'f', description: 'The enemy closest to the barracks'},
      {name: 'Back', command: 'b', description: 'The enemy farthest from the barracks'},
      {name: 'Closest', command: 'c', description: 'The enemy closest to your tower'},
      {name: 'Farthest', command: 'r', description: 'The enemy farthest from your tower'},
      {name: 'Least health', command: 'l', description: 'The enemy with the least health remaining'},
      {name: 'Most health', command: 'h', description: 'The enemy with the most health remaining'},
      {name: 'Least max health', command: 'x', description: 'The enemy with the least health, when at full health'},
      {name: 'Most max health', command: 'm', description: 'The enemy with the most health, when at full health'},
      {name: 'Least armour', command: 't', description: 'The enemy with the least remaining armor'},
      {name: 'Most armour', command: 'a', description: 'The enemy with the most remaining armor'},
      {name: 'AOE', command: 'o', description: 'The enemy which has the most nearby enemies [within 2.5 meters]'},
      {name: 'Quickest', command: 'q', description: 'The enemy with the fastest movement speed, or closest to the barracks, if it’s a tie'},
      {name: 'Slowest', command: 's', description: 'The enemy with the slowest movement speed, or farthest from the barracks, if it’s a tie'}
    ]
  },
  {
    id: 'priorities',
    name: 'Priorities',
    details: 'Choose one or more',
    options: [
      {name: 'Armored', command: 'a', description: 'Enemies with some remaining armor'},
      {name: 'Below half', command: 'h', description: 'Enemies which have less than half their maximum health remaining'},
      {name: 'Boss', command: 'b', description: 'Bosses'},
      {name: 'Burning', command: 'g', description: 'Enemies who have been ignited by the pyromancer or trapper'},
      {name: 'Challenge', command: 'c', description: 'Enemies with a challenge affix [cloaked, horde, fast, elite, armored]'},
      {name: 'Charmable', command: 'r', description: 'Enemies which can currently be charmed [not charmed, and not immune]'},
      {name: 'Multiple', command: 'm', description: 'Enemies which have at least one nearby enemy [within 2.5 meters]'},
      {name: 'Not boss', command: 'o', description: 'Enemies which are not bosses'},
      // {name: 'Not marked', command: 'x', description: 'DeathDealer/UndeadArcher Only: Enemies which do not have your mark'},
      {name: 'Spawned', command: 'p', description: 'Normal enemies. Excludes Summons, Spawner Towers, and Challenge Enemies'},
      {name: 'One shot', command: '1', description: 'Enemies which would be killed by one of your attacks [may be buggy for some specs]'},
      {name: 'Slowable', command: 'l', description: 'Enemies which can currently be slowed [not cc’d or immune]'},
      {name: 'Stackable', command: 't', description: 'Alchemists Only: Enemies which have less than the maximum stacks of your poison'},
      {name: 'Stunnable', command: 'e', description: 'Enemies which can be stunned [not stunned or immune]'},
      {name: 'Stunned', command: 'd', description: 'Enemies which are currently stunned'},
      {name: 'Summoned', command: 'u', description: 'Enemies which have been summoned by a Highpriest'},
      {name: 'Unarmored', command: 'n', description: 'Enemies which currently have no armor'},
      {name: 'Weak', command: 'w', description: 'Enemies who are currently weakened by a trapper'},
      {name: 'Target', command: 'v', description: 'Enemies who are currently marked by the commander to take additional damage'}
    ]
  }
];

// ---
// App
// ---

function initTargetingUI() {
  const template = document.createElement('div');
  template.classList.add('target-priority');
  template.innerHTML = `
  <div class="target-priority__button">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path d="M20.95,11H22.5V13H20.95C20.5,17.17 17.17,20.5 13,20.95V22.5H11V20.95C6.83,20.5 3.5,17.17 3.05,13H1.5V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1.5H13V3.05C17.17,3.5 20.5,6.83 20.95,11M5.07,11H6.5V13H5.07C5.5,16.07 7.93,18.5 11,18.93V17.5H13V18.93C16.07,18.5 18.5,16.07 18.93,13H17.5V11H18.93C18.5,7.93 16.07,5.5 13,5.07V6.5H11V5.07C7.93,5.5 5.5,7.93 5.07,11M16,16H8V15C8,13.67 10.67,13 12,13C13.33,13 16,13.67 16,15V16M12,8A2,2 0 0,1 14,10A2,2 0 0,1 12,12A2,2 0 0,1 10,10A2,2 0 0,1 12,8Z" />
      </svg>
    </div>
    <div class="target-priority__popout">
      <div class="target-class-selector"></div>
      <div class="target-disclaimer">This does not show your characters current targeting options. It is merely a helper for setting new targeting options.</div>
      <div class="targeting-options-wrapper"></div>
      <div class="target-category"></div>
      <div class="target-apply">Apply target settings</div>
    </div>
  `;

  window.controller.videoContainer.appendChild(template);

  generateCategoryButtons();
  generateOptions();
  generateClassSelectors();
  categoryClickEvents();
  targetingOptionsClickEvents();
  applySettingsClickEvents();
}

function updateTargetingUI() {
  updateClassSelectors();
}

// -------------------------
// Generate category buttons
// -------------------------

function generateCategoryButtons() {
  const categoryButtonsContainer = document.querySelector('.target-category');

  targeting.forEach((category, index) => {
    const template = document.createElement('button');
    template.classList.add('target-category__item');
    if (index === 0) template.classList.add('target-category__item--active');
    template.setAttribute('data-category-button', category.id);
    template.innerHTML += `
      ${category.name}
      <span>${category.details}</span>
    `;

    categoryButtonsContainer.appendChild(template);
  });
}

// ---------------
// Genrate options
// ---------------

function generateOptions() {
  const targetingOptionsWrapper = document.querySelector('.targeting-options-wrapper');

  targeting.forEach((category, index) => {
    const template = document.createElement('div');
    template.classList.add('targeting-options');
    if (index === 0) template.classList.add('targeting-options--active');
    template.setAttribute('data-category', category.id);

    category.options.forEach((option, optionIndex) => {
      const item = document.createElement('button');
      item.classList.add('targeting-options__item');
      item.setAttribute('data-command', option.command);
      if (category.id === 'sorting' && optionIndex === 0) {
        item.classList.add('targeting-options__item--active');
        selectedSorting = option.command;
      }

      item.innerHTML += `
        <span class="targeting-info">
          <span class="targeting-info__button">?</span>
          <span class="targeting-info__details">${option.description}</span>
        </span>
        <span class="targeting-button">${option.name}</span>
      `;

      template.innerHTML += item.outerHTML;
    });

    const emptySpots = category.options.length % 3;

    if (emptySpots !== 0) {
      for (let i = 0; i < 3 - emptySpots; i++) {
        template.innerHTML += '<div class="targeting-options__item"></div>';
      }
    }

    targetingOptionsWrapper.appendChild(template);
  });
}

// ------------------------
// Generate class selectors
// ------------------------

function generateClassSelectors() {
  selectedClasses = [];
  const classSelector = document.querySelector('.target-class-selector');

  classSelector.classList.add(`target-class-selector--${window.controller.activeClasses.length}`);

  window.controller.activeClasses.forEach((className, index) => {
    const template = document.createElement('button');
    template.classList.add('target-class-selector__item');
    template.innerHTML = className;
    template.setAttribute('data-class', className);
    if (index === 0) {
      template.classList.add('target-class-selector__item--active');
      selectedClasses.push(className);
    }
    classSelector.appendChild(template);
  });

  classClickEvents();
}

function updateClassSelectors() {
  const classSelector = document.querySelector('.target-class-selector');
  classSelector.innerHTML = '';
  generateClassSelectors();
}

// ---------------------
// Category click events
// ---------------------

function categoryClickEvents() {
  const optionCategoryButtons = document.querySelectorAll('.target-category__item');

  optionCategoryButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (!this.classList.contains('target-category__item--active')) {
        const categoryId = this.getAttribute('data-category-button');
        const activeButton = document.querySelector('.target-category__item--active');
        const newButton = document.querySelector(`[data-category-button="${categoryId}"]`);
        const activeCategory = document.querySelector('.targeting-options--active');
        const newCategory = document.querySelector(`[data-category="${categoryId}"]`);

        activeButton.classList.remove('target-category__item--active');
        newButton.classList.add('target-category__item--active');
        activeCategory.classList.remove('targeting-options--active');
        newCategory.classList.add('targeting-options--active');
      }
    });
  });
}

// ------------------
// Class click events
// ------------------

function classClickEvents() {
  const classButtons = document.querySelectorAll('.target-class-selector__item');

  classButtons.forEach(button => {
    button.addEventListener('click', function() {
      const className = this.getAttribute('data-class');
      
      if (this.classList.contains('target-class-selector__item--active')) {
        selectedClasses.splice(selectedClasses.indexOf(className), 1);
      } else {
        selectedClasses.push(className);
      }

      this.classList.toggle('target-class-selector__item--active');
    });
  });
}

// ------------------------------
// Targeting options click events
// ------------------------------

function targetingOptionsClickEvents() {
  const targetingOptions = document.querySelectorAll('.targeting-options__item');

  targetingOptions.forEach(option => {
    const parentCategory = option.parentElement.getAttribute('data-category');
    option.addEventListener('click', function() {
      const command = this.getAttribute('data-command');

      if (parentCategory === 'sorting') {
        const activeItem = document.querySelector('.targeting-options__item--active');
        selectedSorting = command;
        if (activeItem) activeItem.classList.remove('targeting-options__item--active');
        this.classList.add('targeting-options__item--active');
      } else {
        if (this.classList.contains('targeting-options__item--active')) {
          selectedPriorities.splice(selectedPriorities.indexOf(command), 1);
        } else {
          selectedPriorities.push(command);
        }
        
        this.classList.toggle('targeting-options__item--active');
      }
    });
  });
}

// ---------------------
// Apply target settings
// ---------------------

function applySettingsClickEvents() {
  const applyButton = document.querySelector('.target-apply');

  applyButton.addEventListener('click', function() {
    const classes = selectedClasses.map(className => className[0]).join('');
    sendCommand(`${classes}!tar=${selectedSorting}${selectedPriorities.join('')}`);
  });
}

export {initTargetingUI, updateTargetingUI};