const sendCommand = function(message, callback) {
  const user = window.controller.user;
  if (message === user.lastMessage) {
    message += ' .';
  }
  user.socket.send(`PRIVMSG #${window.controller.channel} : ${message}`);
  if (callback) callback();
  user.lastMessage = message;
}

const sendWhisper = function(message, user) {
  if (user.active && user.connected) {
    user.socket.send('PRIVMSG ' + window.controller.channel + ' :/w' + ' ttdbot ' + message);
  }
};

export {sendCommand, sendWhisper};