var usersInStorage = null;
var users = [];

var overlay = document.createElement('div');
overlay.classList.add('overlay');
//   <section class="users">
//     <h4>Send actions to:</h4>
//   </section>
//   <section class="controls">
//     <button class="controls__button">1</button>
//     <button class="controls__button">2</button>
//     <button class="controls__button">3</button>
//     <button class="controls__button">4</button>
//     <button class="controls__button">5</button>
//     <button class="controls__button">6</button>
//     <button class="controls__button">7</button>
//     <button class="controls__button">8</button>
//     <button class="controls__button">9</button>
//     <button class="controls__button">10</button>
//     <button class="controls__button">11</button>
//     <button class="controls__button">12</button>
//   </section>
overlay.innerHTML = `
<div class="resize-handle"></div>
`;

const $elem = document.querySelector('div');
const mutable = function(e) {
  // Elements initial width and height
  const h = this.offsetHeight;
  const w = this.offsetWidth;
  // Elements original position
  const t = this.offsetTop;
  const l = this.offsetLeft;
  // Click position within element
  const y = t + h - e.pageY;
  const x = l + w - e.pageX;
  
  const hasMoved = () =>
    !(t === this.offsetTop && l === this.offsetLeft);
  
  const hasResized = () =>
    !(w === this.offsetWidth && h === this.offsetHeight);
  
  const follow = (e) => {
    // Set top/left of element according to mouse position
    this.style.top = `${e.pageY + y - h}px`;
    this.style.left = `${e.pageX + x - w}px`;
  }
  
  const resize = (e) => {
    // Set width/height of element according to mouse position
    this.style.width = `${(e.pageX - l + x)}px`;
    this.style.height = `${(e.pageY - t + y)}px`;
  }
  
  
  const unresize = (e) => {
    // Remove listeners that were bound to document
    document.removeEventListener('mousemove', resize);
    document.removeEventListener("mouseup", unresize);
    // Emit events according to interaction
    if (hasResized(e)) this.dispatchEvent(new Event('resized'));
    else this.dispatchEvent(new Event('clicked'));
    e.preventDefault();
  }
  
  const unfollow = (e) => {
    // Remove listeners that were bound to document
    document.removeEventListener('mousemove', follow);
    document.removeEventListener("mouseup", unfollow);
    // Emit events according to interaction
    if (hasMoved(e)) this.dispatchEvent(new Event('moved'));
    else this.dispatchEvent(new Event('clicked'));
    e.preventDefault();
  }
  
  // Add follow listener if not resizing
  if (x > 12 && y > 12) {
    document.addEventListener("mousemove", follow);
    document.addEventListener("mouseup", unfollow);
    e.preventDefault();
  } else {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", unresize);
    e.preventDefault();
  }

}

// Bind mutable to element mousedown
overlay.addEventListener("mousedown", mutable);


// -----
// Users
// -----

var User = function(user, pass, index) {
  this.user = user;
  this.pass = pass;
  this.userContainer = null;
  this.index = index;
  this.webSocket = null;
  this.connectButton = null;
  this.connected = false;

  this.connect = function() {
    var that = this;
    this.webSocket = new WebSocket('wss://irc-ws.chat.twitch.tv:443/', 'irc');

    this.webSocket.addEventListener('open', function(event) {
      that.webSocket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
      that.webSocket.send('PASS ' + that.pass);
      that.webSocket.send('NICK ' + that.user);
      that.webSocket.send('JOIN #archonthewizard');
      // that.webSocket.send('PRIVMSG #archonthewizard : testing');

      that.userContainer.classList.add('connected');
      that.connectButton.removeEventListener('click', that.connect);
      that.connectButton.addEventListener('click', that.disconnect);
      
      that.connected = true;
      that.passDataToOverlay();
    });
  }.bind(this);

  this.disconnect = function() {
    var that = this;
    this.webSocket.close();

    this.webSocket.addEventListener('close', function() {
      that.userContainer.classList.remove('connected');
      that.connectButton.removeEventListener('click', that.disconnect);
      that.connectButton.addEventListener('click', that.connect);
      that.connected = false;
    });
  }.bind(this);

  this.render = function() {
    console.log(this.connected);
    var item = document.createElement('div');
    item.classList.add('users__item');
    item.classList.add('users__item--account');
    item.innerHTML = `
      <div class="users__item__connect ${this.connected ? 'connected' : ''}">
        <button class="users__item__button" data-button="connect">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
          </svg>
        </button>
      </div>
      <div class="users__item__name">${this.user}</div>
    `;

    // accountList.accountListSection.appendChild(item);
    this.userContainer = item;
  };

  this.initButtonFunctionality = function() {  
    this.connectButton = this.userContainer.querySelector('[data-button="connect"]');
    this.connectButton.addEventListener('click', this.connect);
  };
};

// ------------
// Account list
// ------------

var accountList = {
  accountListSection: document.querySelector('.users'),
  init: function() {
    accountList.syncUserList();
  },
  syncUserList: function() {
    chrome.storage.sync.get(null, function(result) {
      if ('users' in result) {
        usersInStorage = result.users;
    
        accountList.clearUsers();
        accountList.convertUsers();

        for (var i = 0; i < users.length; i++) {
          console.log(users[i]);
          users[i].render();
          users[i].initButtonFunctionality();
        }
      }
    });
  },
  convertUsers: function() {
    users = [];

    Object.keys(usersInStorage).forEach(function(key, i) {
      var newUser = new User(usersInStorage[key].user, usersInStorage[key].pass, i);
      users.push(newUser);
    });
  },
  clearUsers: function() {
    var userAccounts = document.querySelectorAll('.users__item--account');
  
    for (var i = 0; i < userAccounts.length; i++) {
      userAccounts[i].remove();
    }
  }
};

// ---------
// Messaging
// ---------

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  console.log(message);
}

// -----------
// Application
// -----------

accountList.init();