import listenToChat from './listenToChat';
import {sendWhisper} from './sendCommand';

const User = function(user, pass) {
  this.userName = user;
  this.pass = pass;
  this.active = true;
  this.socket = null;
  this.connected = false;
  this.class = null;
  this.lastMessage = null;
  this.activeClasses = {
    archer: false,
    rogue: false,
    firemage: false,
    timemage: false,
    poisoner: false,
    bard: false
  };

  // ------
  // Socket
  // ------

  this.socketOpen = function() {
    const socketReadyState = setInterval(function() {
      if (this.socket.readyState) {
        clearInterval(socketReadyState);
        this.connectToChannel();
        this.connected = true;
      }
    }.bind(this), 1000);
  };
  
  this.socketError = function(error) {
    console.log(error);
  };

  this.socketClose = function(message) {
    this.connected = false;
    console.log('disconnected from server', message);
  };

  this.connectToChannel = function() {
    this.socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
    this.socket.send('PASS ' + this.pass);
    this.socket.send('NICK ' + this.userName);
    this.socket.send('JOIN #' + window.controller.channel);
    console.log('Connected to channel: ' + window.controller.channel);
  };

  this.openSocket = function() {
    this.socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443/', 'irc');
    this.socket.addEventListener('open', this.socketOpen.bind(this));
    this.socket.addEventListener('message', function(message) {
      listenToChat(this, message);
    }.bind(this));
    this.socket.addEventListener('close', this.socketClose.bind(this));
    this.socket.addEventListener('error', this.socketError.bind(this));
  }
};

export default User;