'use strict';

import RuntimeConnection from './RuntimeConnection';

const connection = new RuntimeConnection(chrome.runtime.connect({
  name: chrome.devtools.inspectedWindow.tabId.toString(),
}));

chrome.devtools.panels.create('Boilerplate', '', 'panel.html', function(panel) {
  panel.onShown.addListener(function(devtoolWindow) {
    devtoolWindow.devtool = connection;
  });
  panel.onHidden.addListener(function() {
    devtoolWindow.devtool = null;
  });
});
