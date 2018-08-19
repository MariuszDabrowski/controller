import User from './User';
import {toggleUserList, updateUserList} from './userList';

let container = null;
let functionalityAdded = false;

// ----------------
// Toggle user form
// ----------------

const toggleUserForm = function() {
  if (!container) container = document.querySelector('[data-section="add-account"]');
  container.classList.toggle('section-hidden');

  if (!functionalityAdded) {
    const addUserButton = document.querySelector('[data-button="add-user"]');
    addUserButton.addEventListener('click', addUser);
    functionalityAdded = true;
  }
};

// ---------------
// Clear user form
// ---------------

const clearUserForm = function() {
  const inputs = container.querySelectorAll('input');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
  toggleUserForm();
};

// --------
// Add user
// --------

const addUser = function(e) {
  e.preventDefault();

  const userInput = document.querySelector('[data-field="username"]');
  const passInput = document.querySelector('[data-field="pass"]');
  
  window.controller.user = new User({user: userInput.value, pass: passInput.value});

  chrome.storage.sync.set({user: {
    user: userInput.value,
    pass: passInput.value
  }}, function() {
    toggleUserList();
    updateUserList();
    clearUserForm();
  });
};

export {toggleUserForm, clearUserForm, addUser};