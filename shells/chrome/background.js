'use strict';

import RuntimeConnection from './RuntimeConnection';
import wireConnections from './wireConnections';

let connections = {};
chrome.runtime.onConnect.addListener(function(connection) {
  let tabId = connection.name;
  let side = 'devtools';
  if (tabId === 'injector') {
    tabId = connection.sender.tab.id;
    side = 'injector';
  }

  if (!connections[tabId]) {
    connections[tabId] = {};
  }

  const tabConnections = connections[tabId];
  const wrappedConnection = new RuntimeConnection(connection);
  tabConnections[side] = wrappedConnection;
  wrappedConnection.onDisconnect(function() {
    if (tabConnections[side] === wrappedConnection) {
      tabConnections[side] = null;
    }
  });
  
  if (tabConnections.devtools && tabConnections.injector) {
    wireConnections(tabConnections.devtools, tabConnections.injector);
  }
});
