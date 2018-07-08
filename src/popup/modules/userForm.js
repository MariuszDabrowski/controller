import {simplifyList, refreshUserlist} from './userList';
import User from './User';

const container = document.querySelector('[data-section="add-account"]');

// ----------------
// Toggle user form
// ----------------

const toggleUserForm = function() {
  container.classList.toggle('section-hidden');
  container.querySelector('[data-field="username"]').focus();
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

  const users = window.controller.users;
  const userInput = document.querySelector('[data-field="username"]');
  const passInput = document.querySelector('[data-field="pass"]');
  let duplicate = false;
  
  if (Object.keys(users).length) {
    Object.keys(users).map(user => {
      if (users[user].userName === userInput.value) {
        duplicate = true;
      }
    });
  }
  
  if (duplicate) {
    console.log('User already exists!');
    clearUserForm();
    return;
  }
  
  users[userInput.value] = new User({user: userInput.value, pass: passInput.value});

  chrome.storage.sync.set({users: simplifyList()}, function() {
    refreshUserlist();
    clearUserForm();
  });
};

export {toggleUserForm, clearUserForm, addUser};