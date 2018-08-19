const sendCommand = function(socket, message) {
  socket.send('PRIVMSG #' + window.controller.channel + ' : ' + message);
  console.log(message);
}

const sendCommandFromAll = function(message, callback) {
  const users = window.controller.users;
  let delay = 0;

  Object.keys(users).map(user => {
    delay++;
    if (users[user].active && users[user].connected) {
      if (message === users[user].lastMessage) {
        message += ' .';
      }

      // When messages from multiple accounts are sent too quickly sometime... 
      // it causes a huge delay, spreading the messages apart fixes that issue
      setTimeout(function() {
        users[user].socket.send('PRIVMSG #' + window.controller.channel + ' : ' + message);
      },100 * delay);

      users[user].lastMessage = message;
      if (callback) callback(users[user]);
    }
  });
  console.log(message);
};

const sendWhisper = function(message, user) {
  if (user.active && user.connected) {
    user.socket.send('PRIVMSG ' + window.controller.channel + ' :/w' + ' ttdbot ' + message);
  }
};

const sendWhisperFromAll = function(message) {
  const users = window.controller.users;
  let delay = 0;

  Object.keys(users).map(user => {
    delay++;
    if (users[user].active && users[user].connected) {
      // When messages from multiple accounts are sent too quickly sometime... 
      // it causes a huge delay, spreading the messages apart fixes that issue
      setTimeout(function() {
        users[user].socket.send('PRIVMSG ' + window.controller.channel + ' :/w' + ' ttdbot ' + message);
      },100 * delay);
    }
  });
};

export {sendCommand, sendCommandFromAll, sendWhisper, sendWhisperFromAll};