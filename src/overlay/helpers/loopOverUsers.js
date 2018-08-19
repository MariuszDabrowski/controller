const loopOverUsers = function(passedFunction) {
  const users = window.controller.users;

  Object.keys(users).map(user => {
    passedFunction(users[user]);
  });
};

export default loopOverUsers;