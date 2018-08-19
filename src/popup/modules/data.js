const getData = function(key, callback, container) {
  chrome.storage.sync.get(key, function(result) {
    callback(result[key], container);
  });
};

const setData = function(key, data, callback) {
  const newList = {};
  newList[key] = data;

  chrome.storage.sync.set(newList, callback);
};

const removeData = function(item, callback) {
  chrome.storage.sync.remove(item, callback)
};

const sendMessage = function(message) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(request) {
      // if (request.action === 'connect') {
      //   if (connected) {
      //     connected = false;
      //     toggleController.innerHTML = 'Connect';
      //   } else {
      //     window.close();
      //     connected = true;
      //     toggleController.innerHTML = 'Disconnect';
      //   }
      // }
    });
  });
}

export {removeData, getData, setData, sendMessage};