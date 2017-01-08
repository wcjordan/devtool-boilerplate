'use strict';

import WindowConnection from './WindowConnection';

const devtool = new WindowConnection('boilerplate_injected');
devtool.onDisconnect(function() {
  devtool.shutdown();
});

setTimeout(function() {
  const pushStateSelection = function(selectedShape) {
    devtool.send({
      type: 'data_change',
      data: {
        selectedShape: selectedShape.children[0].classList[0]
      }
    });
  };
  pushStateSelection(document.getElementsByClassName('highlighted')[0]);

  devtool.listen(function(payload) {
    if (payload.type === 'init') {
      pushStateSelection(document.getElementsByClassName('highlighted')[0]);
      return;
    }
    selectByName(payload.data.selectedShape);
  });

  const oldOnSelect = window.onSelect;
  window.onSelect = function(selectedShape) {
    oldOnSelect(selectedShape);
    pushStateSelection(selectedShape);
  };
}, 1000);
