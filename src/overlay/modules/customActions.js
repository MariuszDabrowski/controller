import sendCommand from './sendCommand';
import {setData, getData} from '../../popup/modules/data';

// -------------
// Custom action
// -------------

const CustomAction = function(action) {
  this.element = null;
  this.action = null;

  this.init = function() {
    const actionDiv = document.createElement('div');
    actionDiv.classList.add('custom-actions__list__item');
    actionDiv.innerHTML = `
      <button class="custom-actions__list__item__trigger" data-command="${action}">${action}</button>
      <button class="custom-actions__list__item__remove">
        <svg style="width:12px;height:12px" viewBox="0 0 24 24">
          <path fill="#e9ede2" d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
        </svg>
      </button>
    `;

    this.element = actionDiv;
    this.action = action;
    this.initEventListeners();
  };

  this.removeItem = function(e) {
    e.preventDefault();
    const encodedName = encodeURIComponent(this.action);
    actionsData.splice(actionsData.indexOf(encodedName), 1);

    setData('customActions', actionsData, function() {
      this.element.remove();
      delete actions[encodedName];
    }.bind(this));
  }.bind(this);

  this.initEventListeners = function() {
    const removeButton = this.element.querySelector('.custom-actions__list__item__remove');
    const sendCommandButton = this.element.querySelector('.custom-actions__list__item__trigger');

    removeButton.addEventListener('click', this.removeItem);
    sendCommandButton.addEventListener('click', function() {
      sendCommand(this.action);
    }.bind(this));
  };
};

// ---------
// Init Form
// ---------

const initForm = function() {
  const addActionButton = document.querySelector('.custom-actions__form__button');
  const input = document.querySelector('.custom-actions__form__input');

  addActionButton.addEventListener('click', function(e) {
    e.preventDefault();
    if (input.value) {
      updateActionList(input.value);
      input.value = '';
    }
  });
};

// ------------------
// Update action list
// ------------------

let actionsData = [];
let actions = {};
const actionList = document.createElement('div');
actionList.classList.add('custom-actions__list');

const updateActionList = function(newAction) {
  const popout = document.querySelector('.custom-actions__popout');

  if (!newAction) {
    getData('customActions', function(data) {
      actionsData = data;
      let elements = '';
      
      for (let i = 0; i < actionsData.length; i++) {
        const encodedName = encodeURIComponent(actionsData[i]);
        actions[encodedName] = new CustomAction(actionsData[i]);
        actions[encodedName].init();
        actionList.appendChild(actions[encodedName].element);
      }

      popout.prepend(actionList);
    });
  } else {
    actionsData.push(newAction);
    setData('customActions', actionsData, function() {
      const encodedName = encodeURIComponent(newAction);
      actions[encodedName] = new CustomAction(newAction);
      actions[encodedName].init();
      actionList.appendChild(actions[encodedName].element);
    });
  }
};

// --------------
// Custom actions
// --------------

const customActions = function() {
  const selector = document.createElement('div');
  selector.classList.add('custom-actions');
  selector.innerHTML = `
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="#e9ede1" d="M19,20H5V4H7V7H17V4H19M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M19,2H14.82C14.4,0.84 13.3,0 12,0C10.7,0 9.6,0.84 9.18,2H5A2,2 0 0,0 3,4V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4A2,2 0 0,0 19,2Z" />
    </svg>

    <div class="custom-actions__popout">
      <form class="custom-actions__form">
        <input type="text" class="custom-actions__form__input" placeholder="!t !a !p" />
        <button class="custom-actions__form__button">Add</button>
      </form>
    </div>
  `;

  window.controller.videoContainer.appendChild(selector);
  updateActionList();
  initForm();
};

export {customActions};