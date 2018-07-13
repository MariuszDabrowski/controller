import sendCommand from './sendCommand';

// -------
// Init UI
// -------

const initUI = function() {
  let overlay = window.controller.overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.classList.add('accounts-active');
  // overlay.classList.add('overlay--active');
  overlay.innerHTML = `
  <button class="overlay__close" data-button="close-controller">Close</button>
  <button class="accounts__collapse" data-button="toggle-accounts">
    <svg style="width:18px;height:18px" viewBox="0 0 24 24">
      <path fill="#ffffff" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
    </svg>
  </button>
  <div class="accounts">
    <div class="accounts__title">Send commands to:</div>
  </div>
  <div class="towers">
    <button class="towers__item" data-button="command" data-command="!1">1</button>
    <button class="towers__item" data-button="command" data-command="!2">2</button>
    <button class="towers__item" data-button="command" data-command="!3">3</button>
    <button class="towers__item" data-button="command" data-command="!4">4</button>
    <button class="towers__item" data-button="command" data-command="!5">5</button>
    <button class="towers__item" data-button="command" data-command="!6">6</button>
    <button class="towers__item" data-button="command" data-command="!7">7</button>
    <button class="towers__item" data-button="command" data-command="!8">8</button>
    <button class="towers__item" data-button="command" data-command="!9">9</button>
    <button class="towers__item" data-button="command" data-command="!10">10</button>
    <button class="towers__item" data-button="command" data-command="!11">11</button>
    <button class="towers__item" data-button="command" data-command="!12">12</button>
  </div>
  <div class="player-actions">
    <div class="player-actions__item">
      <button class="player-actions__item__option" data-button="command" data-command="!train">Train</button>
      <button class="player-actions__item__option" data-button="command" data-command="!altar">Altar</button>
    </div>
    <div class="player-actions__item">
      <button class="player-actions__item__option" data-button="command" data-command="!p">P up</button>
      <button class="player-actions__item__option" data-button="command" data-command="!pd">P down</button>
    </div>
    <div class="player-actions__item">
      <button class="player-actions__item__option" data-button="command" data-command="!leave">Leave</button>
    </div>
  </div>

  <div class="additional-options">
    <button class="additional-options__item" data-button="popup" data-popup-target="classes">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="#000000" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
      </svg>
    </button>
    <button class="additional-options__item" data-button="popup" data-popup-target="gems">
      <svg style="width:20px;height:20px" viewBox="0 0 24 24">
        <path fill="#000000" d="M21.5,10.8L13.2,2.5C12.5,1.8 11.5,1.8 10.8,2.5L2.5,10.8C1.8,11.5 1.8,12.5 2.5,13.2L10.8,21.5C11.5,22.2 12.5,22.2 13.2,21.5L21.5,13.2C22.1,12.5 22.1,11.5 21.5,10.8Z" />
      </svg>
    </button>
    <button class="additional-options__item" data-button="popup" data-popup-target="maps">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="#000000" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
      </svg>
    </button>
    <button class="additional-options__item" data-button="popup" data-popup-target="info">
      <svg style="width:22px;height:22px" viewBox="0 0 24 24">
        <path fill="#000000" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
      </svg>
    </button>
  </div>

  <div class="additional-options">
    <button class="additional-options__item" data-button="popup" data-popup-target="merc">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="#000000" d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
      </svg>
    </button>
    <button class="additional-options__item" data-button="popup" data-popup-target="specs">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="#000000" d="M16,9C18.33,9 23,10.17 23,12.5V15H17V12.5C17,11 16.19,9.89 15.04,9.05L16,9M8,9C10.33,9 15,10.17 15,12.5V15H1V12.5C1,10.17 5.67,9 8,9M8,7A3,3 0 0,1 5,4A3,3 0 0,1 8,1A3,3 0 0,1 11,4A3,3 0 0,1 8,7M16,7A3,3 0 0,1 13,4A3,3 0 0,1 16,1A3,3 0 0,1 19,4A3,3 0 0,1 16,7M9,16.75V19H15V16.75L18.25,20L15,23.25V21H9V23.25L5.75,20L9,16.75Z" />
      </svg>
    </button>
    <button class="additional-options__item" data-button="popup" data-popup-target="stats">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="#000000" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M7,20H9V14H7V20M11,20H13V12H11V20M15,20H17V16H15V20Z" />
      </svg>
    </button>
    <button class="additional-options__item" data-button="popup" data-popup-target="settings">
      <svg style="width:22px;height:22px" viewBox="0 0 24 24">
        <path fill="#000000" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
      </svg>
    </button>
  </div>

  <div class="popup" data-popup="classes">
    <div class="classes">
      <button class="classes__item" data-button="command" data-command="!archer">Archer</button>
      <button class="classes__item" data-button="command" data-command="!firemage">Firemage</button>
      <button class="classes__item" data-button="command" data-command="!frostmage">Frostmage</button>
      <button class="classes__item" data-button="command" data-command="!alchemist">Alchemist</button>
      <button class="classes__item" data-button="command" data-command="!rogue">Rogue</button>
      <button class="classes__item" data-button="command" data-command="!bard">Bard</button>
      <button class="classes__item" data-button="command" data-command="!trapper">Trapper</button>
      <button class="classes__item" data-button="command" data-command="!highpriest">Highpriest</button>
    </div>
  </div>
  <div class="popup" data-popup="merc">
    <div class="classes">
      <button class="classes__item" data-button="command" data-command="!hireicelo">Icelo<div class="classes__item__price">1,500</div></button>
      <button class="classes__item" data-button="command" data-command="!hireshade">Shade<div class="classes__item__price">1,500</div></button>
      <button class="classes__item" data-button="command" data-command="!hidejubal">Jubal<div class="classes__item__price">1,500</div></button>
      <button class="classes__item" data-button="command" data-command="!hiregunnar">Gunnar<div class="classes__item__price">1,500</div></button>
      <button class="classes__item" data-button="command" data-command="!hireadara">Adara<div class="classes__item__price">1,500</div></button>
      <button class="classes__item" data-button="command" data-command="!hiremoor">Moor<div class="classes__item__price">1,500</div></button>
      <button class="classes__item" data-button="command" data-command="!hirecortez">Cortez<div class="classes__item__price">1,500</div></button>
      <button class="classes__item" data-button="command" data-command="!hiremolan">Molan<div class="classes__item__price">1,500</div></button>
    </div>
  </div>
  <div class="popup" data-popup="gems">
    <div class="gems">
      <button class="gems__item" data-button="command" data-command="!socketruby">Ruby<span class="gems__item__cost">2,500</span></button>
      <button class="gems__item" data-button="command" data-command="!socketemerald">Emerald<span class="gems__item__cost">2,500</span></button>
      <button class="gems__item" data-button="command" data-command="!socketcitrine">Citrine<span class="gems__item__cost">2,500</span></button>
      <button class="gems__item" data-button="command" data-command="!socketonyx">Onyx<span class="gems__item__cost">2,500</span></button>
    </div>
  </div>
  <div class="popup" data-popup="settings">
    <div class="settings">
      <div class="settings__item">
        <div class="settings__item__title">Opacity</div>
        <div class="settings__item__options" data-drag="disabled">
          <input type="range" min="10" max="100" value="100" step="1" data-item="opacity-slider" />
        </div>
      </div>
    </div>
  </div>
  <div class="popup" data-popup="maps">
    <div class="maps">
      <button class="maps__item" data-button="command" data-command="!map1">Map 1</button>
      <button class="maps__item" data-button="command" data-command="!map2">Map 2</button>
      <button class="maps__item" data-button="command" data-command="!map3">Map 3</button>
      <button class="maps__item" data-button="command" data-command="!map4">Map 4</button>
      <button class="maps__item" data-button="command" data-command="!map5">Map 5</button>
      <button class="maps__item" data-button="command" data-command="!map6">Map 6</button>
      <button class="maps__item" data-button="command" data-command="!map7">Map 7</button>
      <button class="maps__item" data-button="command" data-command="!map8">Map 8</button>
      <button class="maps__item" data-button="command" data-command="!map9">Map 9</button>
      <div class="maps__cost">
        <button class="maps__cost__item map__cost__item--active" data-command="">
          <span class="maps__cost__item__title">1 Vote</span>
          <span class="maps__cost__item__price">0</span>
        </button>
        <button class="maps__cost__item" data-command="buy1">          
          <span class="maps__cost__item__title">2 Votes</span>
          <span class="maps__cost__item__price">250</span>
        </button>
        <button class="maps__cost__item" data-command="buy2">          
          <span class="maps__cost__item__title">3 Votes</span>
          <span class="maps__cost__item__price">500</span>
        </button>
        <button class="maps__cost__item" data-command="buy3">
          <span class="maps__cost__item__title">4 Votes</span>
          <span class="maps__cost__item__price">750</span>
        </button>
        <button class="maps__cost__item" data-command="buy4">
          <span class="maps__cost__item__title">5 Votes</span>
          <span class="maps__cost__item__price">1,000</span>
        </button>
      </div>
    </div>
  </div>
  <div class="popup" data-popup="specs">
    <div class="specs">
      <div class="specs__section">
        <div class="specs__section__title">Archer</div>
        <button class="specs__section__item" data-button="command" data-command="!specbowman">Bowman<div class="specs__section__item__cost">5,000</div></button>
        <button class="specs__section__item" data-button="command" data-command="!specsnipet">Sniper<div class="specs__section__item__cost">5,000</div></button>
        <button class="specs__section__item" data-button="command" data-command="!specgunner">Gunner<div class="specs__section__item__cost">5,000</div></button>
      </div>
      <div class="specs__section">
        <div class="specs__section__title">Rogue</div>
        <button class="specs__section__item" data-button="command" data-command="!specknifethrower">Knife Thrower<div class="specs__section__item__cost">5,000</div></button>
        <button class="specs__section__item" data-button="command" data-command="!specassassin">Assassin<div class="specs__section__item__cost">5,000</div></button>
        <button class="specs__section__item" data-button="command" data-command="!specninja">Ninja<div class="specs__section__item__cost">5,000</div></button>
      </div>
      <div class="specs__section">
        <div class="specs__section__title">Frostmage</div>
        <button class="specs__section__item" data-button="command" data-command="!specicemage">Icemage<div class="specs__section__item__cost">5,000</div></button>
        <button class="specs__section__item" data-button="command" data-command="!spectrickster">Trickster<div class="specs__section__item__cost">5,000</div></button>
        <button class="specs__section__item" data-button="command" data-command="!speclightningmage">Lightning Mage<div class="specs__section__item__cost">5,000</div></button>
        <button class="specs__section__item" data-button="command" data-command="!specshockmage">Shock Mage<div class="specs__section__item__cost">5,000</div></button>
      </div>
      <div class="specs__section">
        <div class="specs__section__title">Alchemist</div>
        <button class="specs__section__item" data-button="command" data-command="!specplaguedoctor">Plague Doctor<div class="specs__section__item__cost">5,000</div></button>
        <button class="specs__section__item" data-button="command" data-command="!specundeadarcher">Undead Archer<div class="specs__section__item__cost">5,000</div></button>
        <button class="specs__section__item" data-button="command" data-command="!specdeathdealer">Deathdealer<div class="specs__section__item__cost">5,000</div></button>
        <button class="specs__section__item" data-button="command" data-command="!specpotionmaster">Potion Master<div class="specs__section__item__cost">5,000</div></button>
      </div>
      <div class="specs__section">
        <div class="specs__section__title">Firemage</div>
        <button class="specs__section__item" data-button="command" data-command="!specpyromancer">Pyromancer<div class="specs__section__item__cost">5,000</div></button>
        <button class="specs__section__item" data-button="command" data-command="!specbombermage">Bomber Mage<div class="specs__section__item__cost">5,000</div></button>
        <button class="specs__section__item" data-button="command" data-command="!specsaboteur">Saboteur<div class="specs__section__item__cost">5,000</div></button>
      </div>
      <div class="specs__section">
        <div class="specs__section__title">Bard</div>
        <button class="specs__section__item" data-button="command" data-command="!specminstrel">Minstrel<div class="specs__section__item__cost">5,000</div></button>
        <button class="specs__section__item" data-button="command" data-command="!speccommander">Commander<div class="specs__section__item__cost">5,000</div></button>
        <button class="specs__section__item" data-button="command" data-command="!specscout">Scout<div class="specs__section__item__cost">5,000</div></button>
      </div>
    </div>
  </div>
  <div class="popup" data-popup="stats">
    Stats
  </div>
  <div class="popup" data-popup="info">
    Info
  </div>
  <button class="overlay__resize"></button>
  `;
  
  document.body.appendChild(overlay);
}

// ------------
// Init buttons
// ------------

const initButtons = function() {
  const commandButtons = document.querySelectorAll('[data-button="command"]');

  const commandClick = function() {
    if (!window.controller.dragging) {
      const message = this.getAttribute('data-command');
      sendCommand(window.controller.channel, message);
    }

    // window.controller.dragging = false;
  }

  for (let i = 0; i < commandButtons.length; i++) {
    commandButtons[i].addEventListener('click', commandClick);
  }
}

// ---------
// Init tabs
// ---------

const initTabs = function() {
  const tabs = document.querySelectorAll('[data-button="popup"]');
  const tabContent = document.querySelectorAll('.popup');

  const clearTabClasses = function() {
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('additional-options__item--active');
      tabContent[i].classList.remove('popup--active');
    }
  }

  const toggleTab = function() {
    if (!window.controller.dragging) {
      const popupTarget = this.getAttribute('data-popup-target');
      const tabContent = document.querySelector(`[data-popup="${popupTarget}"]`);

      if (!tabContent.classList.contains('popup--active')) {
        clearTabClasses();
        tabContent.classList.add('popup--active');
        this.classList.add('additional-options__item--active');
        // if (popupTarget === 'settings') {
        //   opacity.init();
        // }
      } else {
        tabContent.classList.remove('popup--active');
        this.classList.remove('additional-options__item--active');
      }
    }
  }

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', toggleTab);
  }
}

// ---------------------
// Drag disable elements
// ---------------------

const initNoDragItems = function() {
  const diableDragItems = document.querySelectorAll('[data-drag="disabled"]');
  const disableDragging = function() {
    window.controller.draggingDisabled = true;
  };
  const enableDragging = function() {
    window.controller.draggingDisabled = false;
  };

  for (let i = 0; i < diableDragItems.length; i++) {
    diableDragItems[i].addEventListener('mouseenter', disableDragging);
    diableDragItems[i].addEventListener('mouseleave', enableDragging);
  }
}

// -------------------
// Init opacity switch
// -------------------

const initOpacitySwtich = function() {
  let slider = document.querySelector('[data-item="opacity-slider"]');;
  let opacity = 100;
  
  const updateOpacity = function() {
    window.controller.overlay.style.opacity = slider.value/100;
  }

  slider.addEventListener('input', updateOpacity);
}

// ---------------------
// Init user list toggle
// ---------------------

const initUserListToggle = function() {
  const toggleAccountsButton = document.querySelector('[data-button="toggle-accounts"]');

  const toggleAccountsView = function() {
    window.controller.overlay.classList.toggle('accounts-active');
  };

  toggleAccountsButton.addEventListener('click', toggleAccountsView);
}

// -----------------
// Init close button
// -----------------

const initCloseController = function() {
  const closeButton = document.querySelector('[data-button="close-controller"]');

  closeButton.addEventListener('click', function() {
    const users = window.controller.users;

    Object.keys(users).map(user => {
      users[user].closeSocket();
    });

    overlayHide();
  });
}

// ------------
// Overlay hide
// ------------

const overlayHide = function() {
  window.controller.overlayActive = false;
  window.controller.overlay.classList.remove('overlay--active');
}

// ------------
// Overlay show
// ------------

const overlayShow = function() {
  window.controller.overlayActive = true;
  window.controller.overlay.classList.add('overlay--active');
}

// ---------
// Map votes
// ---------

const initMapVotes = function() {
  const voteItems = document.querySelectorAll('.maps__cost__item');
  const mapItems = document.querySelectorAll('.maps__item');

  const updateMapCommands = function(element) {
    for (let i = 0; i < mapItems.length; i++) {
      const currentCommand = mapItems[i].getAttribute('data-command').split(' ')[0];
      mapItems[i].setAttribute('data-command', currentCommand + ' ' + window.controller.mapVotes);
    }
  };

  const voteClick = function() {
    const currentlyActive = document.querySelector('.map__cost__item--active');
    currentlyActive.classList.remove('map__cost__item--active');
    this.classList.add('map__cost__item--active');
    window.controller.mapVotes = this.getAttribute('data-command');
    updateMapCommands(this);
  }

  for (let i = 0; i < voteItems.length; i++) {
    voteItems[i].addEventListener('click', voteClick);
  }
}

// ------
// Export
// ------

export {
  initUI,
  initButtons,
  initTabs,
  initNoDragItems,
  initOpacitySwtich,
  initUserListToggle,
  initCloseController,
  overlayHide,
  overlayShow,
  initMapVotes
};