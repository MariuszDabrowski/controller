const sendCommand = function(message, callback) {
  window.controller.user.socket.send('PRIVMSG #' + window.controller.channel + ' : ' + message);
  if (callback) callback();
  console.log(message);
}

const sendWhisper = function(message, user) {
  if (user.active && user.connected) {
    user.socket.send('PRIVMSG ' + window.controller.channel + ' :/w' + ' ttdbot ' + message);
  }
};

export {sendCommand, sendWhisper};