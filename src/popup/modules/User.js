import {removeUser} from './userList';

const User = function(userObj) {
    this.userName = userObj.user;
    this.pass = userObj.pass;
    this.element = null;
    this.rendered = false;

    const that = this;

    this.template = function() {
      const container = document.createElement('div');
      container.classList.add('users__item');
      container.classList.add('users__item--account');

      container.innerHTML = `
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>    
        </div>
        <div class="users__item__name">${this.userName}</div>
        <div class="users__item__remove">
          <button class="users__item__button" data-button="remove-user">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </button>
        </div>
      `;

      return container;
    };

    this.init = function() {
      this.element = this.template();
      this.buttonFunctionality();
    }

    this.buttonFunctionality = function() {
      const removeButton = this.element.querySelector('[data-button="remove-user"]');
      removeButton.addEventListener('click', function() {
        removeUser(that.userName);
      });
    }

    this.render = function(container) {
      this.rendered = true;
      container.prepend(this.element);
    }

    this.init();
  }

  export default User;