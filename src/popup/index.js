import {getData, sendMessage} from './modules/data';
import {initUserList} from './modules/userList';
import {toggleUserForm, addUser} from './modules/userForm';

// -----------
// Application
// -----------
// chrome-extension://extensionID/popup.html

window.controller = {
  userList: document.querySelector('.users'),
  users: {}
};
getData('users', initUserList, window.controller.userList);

const addAccountButton = document.querySelector('[data-button="add-account"]');
addAccountButton.addEventListener('click', toggleUserForm);

const addUserButton = document.querySelector('[data-button="add-user"]');
addUserButton.addEventListener('click', addUser);

const connectButton = document.querySelector('[data-button="connect"]');

connectButton.addEventListener('click', function() {
  window.close();
  sendMessage({action: 'connect'});
});