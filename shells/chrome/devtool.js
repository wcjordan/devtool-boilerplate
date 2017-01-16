/* global chrome */
import RuntimeConnection from './RuntimeConnection';

const connection = new RuntimeConnection(chrome.runtime.connect({
  name: chrome.devtools.inspectedWindow.tabId.toString(),
}));

chrome.devtools.panels.create('Boilerplate', '', 'panel.html', (panel) => {
  panel.onShown.addListener((devtoolWindow) => {
    devtoolWindow.devtool = connection; // eslint-disable-line no-param-reassign
  });
});
