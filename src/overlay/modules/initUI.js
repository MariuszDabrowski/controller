import sendCommand from './sendCommand';

// -------
// Init UI
// -------

const initUI = function() {
  let overlay = window.controller.overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.classList.add('accounts-active');
  overlay.classList.add('overlay--active');
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
      <button class="additional-options__item" data-button="popup" data-popup-target="merc">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="#000000" d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
        </svg>
      </button>
      <button class="additional-options__item" data-button="popup" data-popup-target="gems">
        <svg style="width:20px;height:20px" viewBox="0 0 24 24">
          <path fill="#000000" d="M21.5,10.8L13.2,2.5C12.5,1.8 11.5,1.8 10.8,2.5L2.5,10.8C1.8,11.5 1.8,12.5 2.5,13.2L10.8,21.5C11.5,22.2 12.5,22.2 13.2,21.5L21.5,13.2C22.1,12.5 22.1,11.5 21.5,10.8Z" />
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
        <button class="classes__item" data-button="command" data-command="!hireicelo">Icelo</button>
        <button class="classes__item" data-button="command" data-command="!hireshade">Shade</button>
        <button class="classes__item" data-button="command" data-command="!hidejubal">Jubal</button>
        <button class="classes__item" data-button="command" data-command="!hiregunnar">Gunnar</button>
        <button class="classes__item" data-button="command" data-command="!hireadara">Adara</button>
        <button class="classes__item" data-button="command" data-command="!hiremoor">Moor</button>
        <button class="classes__item" data-button="command" data-command="!hirecortez">Cortez</button>
        <button class="classes__item" data-button="command" data-command="!hiremolan">Molan</button>
      </div>
    </div>
    <div class="popup" data-popup="gems">
      <div class="gems">
        <button class="gems__item" data-button="command" data-command="!socketruby">Ruby</button>
        <button class="gems__item" data-button="command" data-command="!socketemerald">Emerald</button>
        <button class="gems__item" data-button="command" data-command="!socketcitrine">Citrine</button>
        <button class="gems__item" data-button="command" data-command="!socketonyx">Onyx</button>
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
      const users = window.controller.users;

      Object.keys(users).map(user => {
        if (users[user].active) {
          sendCommand(users[user].socket, window.controller.channel, message);
        }
      });
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
  });
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
  initCloseController
};