'use strict';

window.popup = (function() {

  
  // -------
  // Helpers
  // -------

  const getData = function(key, callback) {
    chrome.storage.sync.get(key, function(result) {
      if (result[key]) callback(result[key]);
    });
  };

  const setData = function(key, data, callback) {
    chrome.storage.sync.set({
      key: data
    }, function(result) {
      callback(result[key]);
    }
  };

  const toggleItem = function(item1, item2, class1, class2) {
    const element1 = document.querySelector(item1);
    const element2 = document.querySelector(item2);
    const itemClick = function() {
      this.classList.toggle(class1);
      element2.classList.toggle(class2);
    }
    element1.addEventListener('click', itemClick);
  }

  // -----------
  // Application
  // -----------

  let usersContainer = document.querySelector('.users');
  let users = [];

  const User = function(user, index) {
    this.index = index;
    this.user = user;
    this.element = null;

    this.template = function() {
      const container = document.createElement('div');
      container.classList.add('users__item');
      container.classList.add('users__item--account');

      container.innerHTML = `
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>    
        </div>
        <div class="users__item__name">${this.user}</div>
        <div class="users__item__remove">
          <button class="users__item__button" data-button="remove-user">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </button>
        </div>
      `;

      return container;
    };

    this.init = function() {
      this.element = this.template();
      this.buttonFunctionality(this.element);
    }

    this.removeUser = function() {
      this.element.remove();
    }.bind(this);

    this.buttonFunctionality = function(element) {
      const removeButton = element.querySelector('[data-button="remove-user"]');

      removeButton.addEventListener('click', this.removeUser);
    }

    this.render = function(container) {
      container.prepend(this.element);
    }

    this.init();
  }

  const populateUsers = function(data) {
    for (let i = 0; i < data.length; i++) {
      users.push(new User(data[i].user, i));
      users[i].render(usersContainer);
    }
  }

  getData('users', populateUsers);
  toggleItem('[data-button="add-user"]', '[data-section="add-user"]', 'users__item--active', 'section-hidden');
})();

// // ---------
// // Variables
// // ---------

// var usersInStorage = null;
// var users = [];

// // -----
// // Users
// // -----

// var User = function(user, pass, index) {
//   this.user = user;
//   this.pass = pass;
//   this.userContainer = null;
//   this.index = index;
//   this.webSocket = null;
//   this.removeButton = null;
//   this.connectButton = null;
//   this.connected = false;

//   this.remove = function() {
//     var that = this;

//     delete usersInStorage[this.user];
    
//     chrome.storage.sync.set({
//       users : usersInStorage
//     }, function() {
//       that.userContainer.remove();
//       users.splice(that.index, 1);
//     });
//   }.bind(this);

//   this.render = function() {
//     console.log(this.connected);
//     var item = document.createElement('div');
//     item.classList.add('users__item');
//     item.classList.add('users__item--account');
//     item.innerHTML = `
//       <div>
//         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//           <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//           <path d="M0 0h24v24H0z" fill="none"/>
//         </svg>    
//       </div>
//       <div class="users__item__name">${this.user}</div>
//       <div class="users__item__remove">
//         <button class="users__item__button" data-button="remove-user">
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//             <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
//             <path d="M0 0h24v24H0z" fill="none"/>
//           </svg>
//         </button>
//       </div>
//     `;

//     accountList.accountListSection.insertBefore(item, accountList.addAccountButton);
//     this.userContainer = item;
//   };

//   this.initButtonFunctionality = function() {  
//     this.removeButton = this.userContainer.querySelector('[data-button="remove-user"]');
//     this.removeButton.addEventListener('click', this.remove);
//   };
// };

// // ------------
// // Account list
// // ------------

// var accountList = {
//   accountListSection: document.querySelector('.users'),
//   addAccountButton: document.querySelector('.users__item--add'),
//   init: function() {
//     accountList.syncUserList();
//     accountList.addAccountButton.addEventListener('click', userForm.show);
//   },
//   syncUserList: function() {
//     chrome.storage.sync.get(null, function(result) {
//       if ('users' in result) {
//         usersInStorage = result.users;
    
//         accountList.clearUsers();
//         accountList.convertUsers();

//         for (var i = 0; i < users.length; i++) {
//           users[i].render();
//           users[i].initButtonFunctionality();
//         }
//       }
//     });
//   },
//   convertUsers: function() {
//     users = [];

//     Object.keys(usersInStorage).forEach(function(key, i) {
//       var newUser = new User(usersInStorage[key].user, usersInStorage[key].pass, i);
//       users.push(newUser);
//     });
//   },
//   clearUsers: function() {
//     var userAccounts = document.querySelectorAll('.users__item--account');
  
//     for (var i = 0; i < userAccounts.length; i++) {
//       userAccounts[i].remove();
//     }
//   }
// };

// // ---------
// // User Form
// // ---------

// var userForm = {
//   userFormSection: document.querySelector('[data-section="add-user"]'),
//   userInput: document.querySelector('[data-field="username"]'),
//   passInput: document.querySelector('[data-field="pass"]'),
//   init: function() {
//     var addUserButton = document.querySelector('[data-button="add-user"]');
//     addUserButton.addEventListener('click', this.addUser);
//   },
//   clearInputs: function() {
//     userForm.userInput.value = '';
//     userForm.passInput.value = '';
//   },
//   addUser: function() {
//     chrome.storage.sync.get(null, function(result) {
//       var savedUsers = {};
//       var user = userForm.userInput.value;
//       var pass = userForm.passInput.value;
  
//       if ('users' in result) {
//         savedUsers = result.users;
//       }
  
//       if (!(user in savedUsers)) {
//         savedUsers[user] = {user, pass};
        
//         chrome.storage.sync.set({users : savedUsers}, function() {
//           userForm.clearInputs();
//           userForm.hide();
//           accountList.syncUserList();
//         });
//       }
//     });
//   },
//   show: function() {
//     userForm.userFormSection.classList.remove('section-hidden')

//     accountList.addAccountButton.removeEventListener('click', userForm.show);
//     accountList.addAccountButton.addEventListener('click', userForm.hide);
//   },
//   hide: function() {
//     userForm.userFormSection.classList.add('section-hidden');

//     accountList.addAccountButton.removeEventListener('click', userForm.hide);
//     accountList.addAccountButton.addEventListener('click', userForm.show);
//   }
// }

// // -----------
// // Application
// // -----------

// accountList.init();
// userForm.init();

// var toggleController = document.querySelector('[data-button="toggle-controller"]');
// var connected = false;

// toggleController.addEventListener('click', function() {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {action: 'connect'}, function(request) {
//       if (request.action === 'connect') {
//         if (connected) {
//           connected = false;
//           toggleController.innerHTML = 'Connect';
//         } else {
//           window.close();
//           connected = true;
//           toggleController.innerHTML = 'Disconnect';
//         }
//       }
//     });
//   });
// });

// // var user1 = new Socket({
// //   user: 'dongerlistdotcom',
// //   channel: 'archonthewizard',
// //   pass: 'oauth:1ct29w5f8qffd7gtpy9fxlan7gzsp1'
// // });

// // var user2 = new Socket({
// //   user: 'dongerlistdotcom2',
// //   channel: 'archonthewizard',
// //   pass: 'oauth:5og3ceinnq5gj8bazlh3vxbj610tsn'
// // });