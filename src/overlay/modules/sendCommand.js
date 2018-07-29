const sendCommand = function(message) {
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
    }
  });
  console.log(message);
}

const sendWhisper = function(message) {
  const users = window.controller.users;
  let delay = 0;

  Object.keys(users).map(user => {
    delay++;
    if (users[user].active && users[user].connected) {
      // When messages from multiple accounts are sent too quickly sometime... 
      // it causes a huge delay, spreading the messages apart fixes that issue
      setTimeout(function() {
        users[user].socket.send(message);
      },100 * delay);
    }
  });
}

export {sendCommand, sendWhisper};