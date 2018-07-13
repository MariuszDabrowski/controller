const sendCommand = function(channel, message) {
  const users = window.controller.users;
  let delay = 0;

  Object.keys(users).map(user => {
    delay++;
    if (users[user].active && users[user].connected) {
      // When messages from multiple accounts are sent too quickly sometime... 
      // it causes a huge delay, spreading the messages apart fixes that issue
      setTimeout(function() {
        users[user].socket.send('PRIVMSG #' + channel + ' : ' + message);
      },100 * delay);
    }
  });
  console.log(message);
}

export default sendCommand;