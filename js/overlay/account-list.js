'use strict';

(function() {
  let users = window.controller.users;
  let accountList = window.controller.accountList = {
    init: function() {
      const toggleAccountsButton = document.querySelector('[data-button="toggle-accounts"]');

      toggleAccountsButton.addEventListener('click', toggleAccountsView);
      function toggleAccountsView() {
        window.controller.overlayDiv.classList.toggle('accounts-active');
      }

      accountList.getUsers();
    },
    getUsers: function() {
      chrome.storage.sync.get('users', function(result) {
        Object.keys(result.users).forEach(function(key) {
          let user = result.users[key];
          user.active = false;
          users.push(user);
        });

        accountList.populateList();
      });
    },
    populateList: function() {
      for (let i = 0; i < users.length; i++) {
        let userDiv = document.createElement('div');
        userDiv.classList.add('accounts__item');
        userDiv.classList.add('accounts__item--active');
        userDiv.innerHTML = users[i].user;
        userDiv.addEventListener('click', toggleAccountItem);
        userDiv.index = i;
        document.querySelector('.accounts').appendChild(userDiv);
        users[i].active = true
      }

      accountList.openSockets();

      function toggleAccountItem() {
        if (!window.controller.dragging) {
          this.classList.toggle('accounts__item--active');
          (this.classList.contains('accounts__item--active')) ? users[this.index].active = true : users[this.index].active = false ;
        }
      }
    },
    clearList: function() {
      const accountsItems = document.querySelectorAll('.accounts__item');

      for (let i = 0; i < accountsItems.length; i++) {
        accountsItems[i].remove();
      }

      users = [];
      window.controller.accountList.closeSockets();
    },
    openSockets: function() {
      const channel = window.controller.channel;

      for (let i = 0; i < users.length; i++) {
        const socket = users[i].socket =  new WebSocket('wss://irc-ws.chat.twitch.tv:443/', 'irc');

        socket.addEventListener('open', function() {
          socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
          socket.send('PASS ' + users[i].pass);
          socket.send('NICK ' + users[i].user);
          socket.send('JOIN #' + channel);
        });
      }
    },
    closeSockets: function() {
      for (let i = 0; i < users.length; i++) {
        users[i].socket.close();
      }
    }
  };
})();