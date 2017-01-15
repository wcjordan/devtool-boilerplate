'use strict';

const WindowConnection = function(sourceName, win) {
  this.win = win || window;
  this.sourceName = sourceName;
  this.listeners = [];
  this.disconnectListeners = [];
  this.handleMessage = this.handleMessage.bind(this);

  this.win.addEventListener('message', this.handleMessage);
};

WindowConnection.side = {
  BOILERPLATE_INJECTED: 'BOILERPLATE_INJECTED',
  BOILERPLATE_INJECTOR: 'BOILERPLATE_INJECTOR',
};

WindowConnection.prototype.send = function(data) {
  this.win.postMessage({
    source: this.sourceName,
    payload: data,
  }, '*');
};

WindowConnection.prototype.listen = function(handler) {
  this.listeners.push(handler);
};

WindowConnection.prototype.onDisconnect = function(handler) {
  this.disconnectListeners.push(handler);
};

WindowConnection.prototype.shutdown = function() {
  this.win.postMessage({
    source: this.sourceName,
    payload: 'shutdown'
  }, '*');
  this.win.removeEventListener('message', this.handleMessage);
  this.listeners = [];
};

WindowConnection.prototype._isInvalidMsgSource = function(msgSourceName) {
  const validSource = msgSourceName in WindowConnection.side;
  return !validSource || msgSourceName === this.sourceName;
};

WindowConnection.prototype.handleMessage = function(evt) {
  if (!evt.data || this._isInvalidMsgSource(evt.data.source)) {
    return;
  }

  if (evt.data.payload === 'shutdown') {
    this.disconnectListeners.forEach(function(listener) {
      listener();
    });
  } else {
    this.listeners.forEach(function(listener) {
      listener(evt.data.payload);
    });
  }
};

export default WindowConnection;
