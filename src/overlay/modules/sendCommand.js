const sendCommand = function(socket, channel, message) {
  socket.send('PRIVMSG #' + channel + ' : ' + message);
}

export default sendCommand;