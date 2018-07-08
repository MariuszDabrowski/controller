const User = function(user, pass) {
  this.userName = user;
  this.pass = pass;
  this.container = null;
  this.active = true;
  this.socket = null;

  this.template = function() {
    let userDiv = document.createElement('div');
    userDiv.classList.add('accounts__item');
    userDiv.classList.add('accounts__item--active');
    userDiv.innerHTML = this.userName;

    this.container = userDiv;
    document.querySelector('.accounts').appendChild(userDiv);
  };

  this.render = function() {
    this.template();
    this.container.addEventListener('click', this.toggleUser);
  };

  this.toggleUser = function() {
    this.container.classList.toggle('accounts__item--active');
    this.active = !this.active;
  }.bind(this);

  this.openSocket = function() {
    const that = this;
    this.socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443/', 'irc');

    this.socket.addEventListener('open', function() {
      console.log('connected to server');
    });

    this.socket.addEventListener('close', function() {
      console.log('disconnected from server');
    });

    const connectToChannel = function() {
      this.socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
      this.socket.send('PASS ' + this.pass);
      this.socket.send('NICK ' + this.userName);
      this.socket.send('JOIN #' + window.controller.channel);
    }.bind(this);

    this.socket.addEventListener('open', connectToChannel);
  }

  this.closeSocket = function() {
    this.socket.close();
  }
};

export default User;