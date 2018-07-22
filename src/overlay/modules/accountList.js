import User from './User';

const initAccountList = function() {
  const accountList = document.createElement('div');
  accountList.classList.add('account-list');
  accountList.innerHTML = `
    <div class="account-list__container">
      <div class="account-list__title">Send commands to:</div>
    </div>
  `;

  window.controller.videoContainer.appendChild(accountList);
};

const populateUsers = function(data) {
  const users = window.controller.users;

  Object.keys(data).map(user => {
    if (!(user in users)) {
      users[user] = new User(data[user].user, data[user].pass);
      users[user].render();
    }

    if (!users[user].connected) {
      users[user].openSocket();
    }
  });

  // Remove accounts that were removed
  Object.keys(users).map(user => {
    if (!(user in data)) {
      users[user].remove();
      delete users[user];
    }
  });
};

export {initAccountList, populateUsers};