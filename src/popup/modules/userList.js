import User from './User';
import {removeData, setData} from './data';
import {toggleUserForm, clearUserForm} from './userForm';

// --------------
// Populate users
// --------------

const initUserList = function(data) {
  toggleUserList();
  const userList = document.querySelector('.users');
  
  window.controller.user = new User(data);
  window.controller.user.render(userList);
};

// ----------------
// Toggle user list
// ----------------

const toggleUserList = function() {
  const container = document.querySelector('[data-section="users"]');
  container.classList.toggle('section-hidden');
};

// -----------
// Remove user
// -----------

const removeUser = function(user) {
  window.controller.user.element.remove();
  window.controller.user = null;
  removeData('user', function() {
    toggleUserList();
    toggleUserForm();
  });
};

// 
// 
// 

const updateUserList = function() {
  const userList = document.querySelector('.users');
  window.controller.user.render(userList);
};

export {updateUserList, toggleUserList, initUserList, removeUser};