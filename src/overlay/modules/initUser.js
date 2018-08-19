import User from './User';

const initUser = function(data) {
  const user = window.controller.user;
  
  window.controller.user = new User(data.user, data.pass);
  window.controller.user.render();
  
  if (!window.controller.user.connected) {
    window.controller.user.openSocket();
  }
};

export default initUser;