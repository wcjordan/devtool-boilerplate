'use strict';

const WindowConnection = function(sourceName) {
  this.sourceName = sourceName;
  this.listeners = [];
  this.disconnectListeners = [];
  this.handleMessageFromPage = this.handleMessageFromPage.bind(this);

  window.addEventListener('message', this.handleMessageFromPage);
};

WindowConnection.prototype.send = function(data) {
  window.postMessage({
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

WindowConnection.prototype.shutdown = function(data) {
  window.postMessage({
    source: this.sourceName,
    payload: 'shutdown'
  }, '*');
  window.removeEventListener('message', this.handleMessageFromPage);
  this.listeners = [];
};

WindowConnection.prototype.handleMessageFromPage = function(evt) {
  if (!evt.data || evt.data.source === this.sourceName) {
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
