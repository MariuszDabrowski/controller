import User from './User';
import {setData} from './data';
import {clearUserForm} from './userForm';

// --------------
// Populate users
// --------------

const initUserList = function(data, container) {
  let users = window.controller.users;

  Object.keys(data).map(user => {
    users[user] = new User(data[user]);
    users[user].render(container);
  });
};

// ------------
// Refresh list
// ------------

const refreshUserlist = function() {
  const users = window.controller.users;

  Object.keys(users).map(user => {
    if (!users[user].rendered) {
      users[user].render(window.controller.userList);
    }
  });
};

// -------------
// Simplify list
// -------------

const simplifyList = function() {
  const users = window.controller.users;
  let simplifiedList = {};

  Object.keys(users).map(user => {
    simplifiedList[user] = {
      user: users[user].userName,
      pass: users[user].pass
    };
  });

  return simplifiedList;
};

// -----------
// Remove user
// -----------

const removeUser = function(user) {
  const users = window.controller.users;
  users[user].element.remove();
  delete users[user];
  setData('users', simplifyList(users), refreshUserlist);
};

export {initUserList, refreshUserlist, removeUser, simplifyList};