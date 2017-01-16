function RuntimeConnection(connection) {
  this.connection = connection;
  this.disconnected = false;
  this.listeners = [];
  this.disconnectListeners = [];

  this.connection.onMessage.addListener((evt) => {
    this.listeners.forEach(listener => listener(evt));
  });

  this.connection.onDisconnect.addListener(() => {
    this.disconnected = true;
    this.disconnectListeners.forEach(listener => listener());
  });
}

RuntimeConnection.prototype.send = function send(data) {
  if (this.disconnected) {
    return;
  }
  this.connection.postMessage(data);
};

RuntimeConnection.prototype.listen = function listen(handler) {
  this.listeners.push(handler);
};

RuntimeConnection.prototype.onDisconnect = function onDisconnect(handler) {
  this.disconnectListeners.push(handler);
};

RuntimeConnection.prototype.shutdown = function shutdown() {
  this.listeners = [];
};

export default RuntimeConnection;
