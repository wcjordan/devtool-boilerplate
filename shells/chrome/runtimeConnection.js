'use strict';

const RuntimeConnection = function(connection) {
  this.connection = connection;
  this.disconnected = false;
  this.listeners = [];
  this.disconnectListeners = [];

  this.connection.onMessage.addListener((evt) => {
    this.listeners.forEach(function(listener) {
      listener(evt);
    });
  });

  this.connection.onDisconnect.addListener(() => {
    this.disconnected = true;
    this.disconnectListeners.forEach(function(listener) {
      listener();
    });
  });
};

RuntimeConnection.prototype.send = function(data) {
  if (this.disconnected) {
    return;
  }
  this.connection.postMessage(data);
};

RuntimeConnection.prototype.listen = function(handler) {
  this.listeners.push(handler);
};

RuntimeConnection.prototype.onDisconnect = function(handler) {
  this.disconnectListeners.push(handler);
};

RuntimeConnection.prototype.shutdown = function() {
  this.listeners = [];
};

export default RuntimeConnection;
