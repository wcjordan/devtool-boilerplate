'use strict';

import RuntimeConnection from './RuntimeConnection';
import WindowConnection from './WindowConnection';
import wireConnections from './wireConnections';

// Inject script to run on page
var script = document.createElement('script');
script.src = chrome.runtime.getURL('injected_script.js');
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);

// Setup devtools messaging connection
const connectionToDevtool = new RuntimeConnection(chrome.runtime.connect({
  name: 'injector',
}));
const connectionToWebpage = new WindowConnection('boilerplate_injector');
wireConnections(connectionToDevtool, connectionToWebpage);
