'use strict';

(function() {
  const commandButtons = document.querySelectorAll('[data-button="command"]');

  let users = window.controller.users;
  let sendCommand = window.controller.sendCommand = function() {
    if (!window.controller.dragging) {
      const command = this.getAttribute('data-command');

      for (let i = 0; i < users.length; i++) {
        if (users[i].active) {
          users[i].socket.send('PRIVMSG #' + window.controller.channel + ' : ' + command);
        }
      }
    }
    window.controller.dragging = false;
  }

  for (let i = 0; i < commandButtons.length; i++) {
    commandButtons[i].addEventListener('click', sendCommand);
  }
})();