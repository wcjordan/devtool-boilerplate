'use strict';


import WindowConnection from '../../src/WindowConnection';
import devtoolPanel from '../../src/panel.jsx';

// Inject script to run on page
const target = document.getElementById('examplePage');
const script = target.contentDocument.createElement('script');
script.src = '../build/injected_script.js';
target.contentDocument.body.appendChild(script);

// Setup devtools messaging connection
window.devtool = new WindowConnection('boilerplate_devtool', target.contentWindow);
