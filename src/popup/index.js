import {getData, sendMessage} from './modules/data';
import {initUserList} from './modules/userList';
import {toggleUserForm, addUser} from './modules/userForm';

// -----------
// Application
// -----------
// chrome-extension://extensionID/popup.html
// chrome-extension://fehemkfdmbcgnflpkdnfnoingkngomog/popup.html

window.controller = {
  userList: document.querySelector('.users'),
  users: {},
  connected: false
};
getData('users', initUserList, window.controller.userList);

// Check to see if the overlay is already active
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {action: 'checkStatus'}, function(response) {
    const connectButton = document.querySelector('[data-button="connect"]');
    if (response.status) {
      window.controller.connected = true;
      connectButton.innerHTML = 'Disconnect';
    } else {
      window.controller.connected = false;
      connectButton.innerHTML = 'Connect';
    }
  });
});

const addAccountButton = document.querySelector('[data-button="add-account"]');
addAccountButton.addEventListener('click', toggleUserForm);

const addUserButton = document.querySelector('[data-button="add-user"]');
addUserButton.addEventListener('click', addUser);

const connectButton = document.querySelector('[data-button="connect"]');

connectButton.addEventListener('click', function() {
  if (!window.controller.connected) {
    sendMessage({action: 'connect'});
  } else {
    sendMessage({action: 'disconnect'});
  }
  window.close();
});