'use strict';

(function() {
  window.controller.sendCommand = function(users, channel, message) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].active) {
        users[i].socket.send('PRIVMSG #' + channel + ' : ' + message);
      }
    }
  }
})();