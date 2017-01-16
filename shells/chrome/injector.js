/* global chrome */
import RuntimeConnection from './RuntimeConnection';
import WindowConnection from '../../src/WindowConnection';
import wireConnections from './wireConnections';

// Inject script to run on page
const script = document.createElement('script');
script.src = chrome.runtime.getURL('injected_script.js');
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);

// Setup devtools messaging connection
const connectionToDevtool = new RuntimeConnection(chrome.runtime.connect({
  name: 'injector',
}));
const connectionToWebpage = new WindowConnection(WindowConnection.side.BOILERPLATE_INJECTOR);
wireConnections(connectionToDevtool, connectionToWebpage);
