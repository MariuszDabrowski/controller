// --------------
// Group Commands
// --------------

let shiftPressed = false;
let groupedCommands = [];

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 16) shiftPressed = true;
});

window.addEventListener('keyup', (e) => {
  if (e.keyCode === 16) shiftPressed = false;
  if (groupedCommands.length) firegroupedCommands();
});

function firegroupedCommands() {
  sendCommand(groupedCommands.join(' '));
  groupedCommands = [];
}

// ------------
// Send Command
// ------------

const sendCommand = function(message) {
  if (shiftPressed) {
    groupedCommands.push(message);
    return;
  };

  const user = window.controller.user;
  if (message === user.lastMessage) {
    message += ' .';
  }
  user.socket.send(`PRIVMSG #${window.controller.channel} : ${message}`);
  user.lastMessage = message;
}

// ------------
// Send Whisper
// ------------

const sendWhisper = function(message, user) {
  if (user.connected) {
    user.socket.send('PRIVMSG ' + window.controller.channel + ' :/w' + ' ttdbot ' + message);
  }
};

export {sendCommand, sendWhisper};