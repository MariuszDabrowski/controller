import listenToChat from './listenToChat';
import {sendWhisper} from './sendCommand';

const User = function(user, pass) {
  this.userName = user;
  this.pass = pass;
  this.active = true;
  this.socket = null;
  this.connected = false;
  this.gemStats = null;
  this.class = null;
  this.specs = null;
  this.tempMemory = null;

  // Triggers when the users stats are updated
  this.updatedStats = function() {
    // console.log('-------------');
    // if (this.gemStats.using) console.log(`${this.userName} is using ${this.gemStats.using}`);
    // if (this.class) console.log(`${this.userName} is using ${this.class}`);
    // if (this.specs) console.log(this.specs);
  };

  this.render = function() {
    console.log('render user');
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
        sendWhisper('!gems', this);
        sendWhisper('!specs', this);
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