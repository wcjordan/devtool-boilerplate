import WindowConnection from './WindowConnection';

const devtool = new WindowConnection(WindowConnection.side.BOILERPLATE_INJECTED);
devtool.onDisconnect(() => devtool.shutdown());

setTimeout(() => {
  function pushStateSelection(selectedShape) {
    if (!selectedShape) {
      return;
    }

    devtool.send({
      type: 'data_change',
      data: {
        selectedShape: selectedShape.children[0].classList[0],
      },
    });
  }
  pushStateSelection(document.getElementsByClassName('highlighted')[0]);

  devtool.listen((payload) => {
    if (payload.type === 'init') {
      pushStateSelection(document.getElementsByClassName('highlighted')[0]);
      return;
    }
    window.selectByName(payload.data.selectedShape);
  });

  const oldOnSelect = window.onSelect;
  window.onSelect = function onSelect(selectedShape) {
    oldOnSelect(selectedShape);
    pushStateSelection(selectedShape);
  };
}, 1000);
