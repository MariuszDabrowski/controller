const User = function(user, pass) {
  this.userName = user;
  this.pass = pass;
  this.container = null;
  this.active = true;
  this.socket = null;
  this.connected = false;

  this.template = function() {
    let userDiv = document.createElement('div');
    userDiv.classList.add('accounts__item');
    userDiv.classList.add('accounts__item--active');
    userDiv.innerHTML = `
    <div class="accounts__item__section">${this.userName}</div>
    <div class="accounts__item__section accounts__item__section-connection">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
        <path d="M565.8,639c-52.4,0-104.9-20-144.8-59.9c-10.8-10.8-10.8-28.5,0-39.3c10.8-10.8,28.5-10.8,39.3,0c58.2,58.2,152.8,58.2,211,0l202.2-202.2c58.2-58.2,58.2-152.8,0-211c-58.2-58.2-152.8-58.2-211,0L491.9,297.2c-10.8,10.8-28.5,10.8-39.3,0c-10.8-10.8-10.8-28.5,0-39.3L623.2,87.2C703,7.4,833,7.4,912.8,87.2c79.8,79.9,79.9,209.8,0,289.6L710.6,579.1C670.6,619,618.2,639,565.8,639L565.8,639L565.8,639z M232.1,972.7c-52.5,0-104.9-20-144.8-59.9C7.4,832.9,7.4,703,87.2,623.2l202.2-202.2c79.9-79.9,209.8-79.9,289.6,0c10.8,10.8,10.8,28.5,0,39.3c-10.8,10.8-28.5,10.8-39.3,0c-58.2-58.2-152.8-58.2-211,0L126.6,662.5c-58.2,58.2-58.2,152.8,0,211c58.2,58.2,152.8,58.2,211,0l170.6-170.6c10.8-10.8,28.5-10.8,39.3,0c10.8,10.8,10.8,28.5,0,39.3L376.8,912.8C336.9,952.7,284.5,972.7,232.1,972.7L232.1,972.7L232.1,972.7z"/><path d="M232.1,990L232.1,990c-59.4,0-115.2-23.1-157.1-65c-41.9-41.9-65-97.7-65-157.1c0-59.4,23.1-115.2,65-157.1l202.2-202.2c41.9-41.9,97.7-65,157.1-65c59.4,0,115.2,23.1,157,65c17.6,17.6,17.6,46.2,0,63.8c-8.5,8.5-19.9,13.2-31.9,13.2s-23.4-4.7-31.9-13.2c-24.9-24.9-58-38.6-93.2-38.6c-35.3,0-68.4,13.7-93.2,38.6L138.8,674.8c-24.9,24.9-38.6,58-38.6,93.2s13.7,68.4,38.6,93.2c24.9,24.9,58,38.6,93.2,38.6c35.3,0,68.4-13.7,93.2-38.6l170.6-170.6c8.5-8.5,19.9-13.2,31.9-13.2c12.1,0,23.4,4.7,31.9,13.2c8.5,8.5,13.2,19.9,13.2,31.9c0,12.1-4.7,23.4-13.2,31.9L389.1,925C347.2,966.9,291.5,990,232.1,990L232.1,990z M434.3,378.4c-50.1,0-97.2,19.5-132.6,54.8L99.5,635.4c-35.4,35.3-54.8,82.4-54.8,132.5c0,50.1,19.5,97.2,54.8,132.6c35.3,35.3,82.4,54.8,132.5,54.8c50.1,0,97.2-19.5,132.5-54.8l170.6-170.6c2-2,3.1-4.6,3.1-7.4s-1.1-5.4-3.1-7.4c-2-2-4.6-3.1-7.4-3.1c-2.8,0-5.4,1.1-7.4,3.1L349.8,885.7c-31.4,31.4-73.2,48.7-117.7,48.7s-86.3-17.3-117.7-48.7C82.9,854.3,65.6,812.5,65.6,768c0-44.5,17.3-86.3,48.7-117.7L316.5,448c31.4-31.4,73.2-48.7,117.7-48.7c44.5,0,86.3,17.3,117.7,48.7c2,2,4.6,3.1,7.4,3.1c2.8,0,5.4-1.1,7.4-3.1c4.1-4.1,4.1-10.7,0-14.8C531.5,397.8,484.4,378.4,434.3,378.4z M565.8,656.3L565.8,656.3c-59.4,0-115.2-23.1-157.1-65c-8.5-8.5-13.2-19.9-13.2-31.9c0-12.1,4.7-23.4,13.2-31.9c8.5-8.5,19.9-13.2,31.9-13.2c12.1,0,23.4,4.7,31.9,13.2c24.9,24.9,58,38.6,93.2,38.6c35.3,0,68.4-13.7,93.2-38.6l202.2-202.2c24.9-24.9,38.6-58,38.6-93.2s-13.7-68.4-38.6-93.2c-24.9-24.9-58-38.6-93.2-38.6s-68.4,13.7-93.2,38.6L504.1,309.4c-8.5,8.5-19.9,13.2-31.9,13.2c-12.1,0-23.4-4.7-31.9-13.2c-17.6-17.6-17.6-46.2,0-63.8L610.9,75c41.9-41.9,97.7-65,157.1-65c59.4,0,115.2,23.1,157,65c41.9,41.9,64.9,97.7,65,157.1c0,59.4-23.1,115.2-65,157.1L722.8,591.3C680.9,633.2,625.2,656.3,565.8,656.3L565.8,656.3z M440.6,548.9c-2.8,0-5.4,1.1-7.4,3.1c-2,2-3.1,4.6-3.1,7.4s1.1,5.4,3.1,7.4c35.3,35.3,82.4,54.8,132.5,54.8c50.1,0,97.2-19.5,132.5-54.8l202.2-202.2c35.3-35.3,54.8-82.4,54.8-132.5c0-50.1-19.5-97.2-54.8-132.6C865.2,64.1,818.1,44.7,768,44.7c-50.1,0-97.2,19.5-132.6,54.8L464.8,270.1c-4.1,4.1-4.1,10.7,0,14.8c2,2,4.6,3.1,7.4,3.1c2.8,0,5.4-1.1,7.4-3.1l170.6-170.6c31.4-31.4,73.2-48.7,117.7-48.7c44.5,0,86.3,17.3,117.7,48.7c31.4,31.4,48.7,73.2,48.7,117.7c0,44.5-17.3,86.3-48.7,117.7L683.5,552c-31.4,31.4-73.2,48.7-117.7,48.7c-44.5,0-86.3-17.3-117.7-48.7C446,550,443.4,548.9,440.6,548.9z"/>
      </svg>
    </div>
    `;

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

  this.remove = function() {
    this.container.remove();
  };

  this.openSocket = function() {
    const that = this;
    this.socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443/', 'irc');

    this.socket.addEventListener('open', function() {
      this.connected = true;
      this.container.classList.add('connected');
      console.log('connected to server');
    }.bind(this));

    this.socket.addEventListener('close', function() {
      this.connected = false;
      this.container.classList.remove('connected');
      console.log('disconnected from server');
    }.bind(this));

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