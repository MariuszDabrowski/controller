import User from './User';

const initAccountList = function(data) {
  const users = window.controller.users;

  Object.keys(data).map(user => {
    users[user] = new User(data[user].user, data[user].pass);
    users[user].render();
    users[user].openSocket();
  });
};

export {initAccountList};