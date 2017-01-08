'use strict';

import React from 'react';
import { Provider, connect } from 'react-redux'
import { bindActionCreators, createStore } from 'redux'
import { render } from 'react-dom';
import panelReducer from './panelReducer';
import * as Actions from './panelReducer';

class ShapePicker extends React.PureComponent {
  render() {
    return (
      <select name="shape" value={this.props.selectedShape} onChange={this.change.bind(this)}>
        <option value="square">Square</option>
        <option value="circle">Circle</option>
        <option value="triangle">Triangle</option>
      </select>
    );
  }

  change(event){
    this.props.actions.updateShape(event.target.value);
  }
};

const mapStateToProps = (state) => ({
  selectedShape: state.selectedShape
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

const BoundShapePicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShapePicker);

const store = createStore(panelReducer);
store.subscribe(function() {
  let state = store.getState();
  if (!state.selectedShape) {
    return;
  }

  window.devtool.send({
    type: 'data_change',
    data: state
  });
});

setTimeout(function() {
  window.devtool.listen(function(payload) {
    store.dispatch(Actions.updateShape(payload.data.selectedShape));
  });

  window.devtool.send({
    type: 'init'
  });
});

render(
  <Provider store={store}>
    <BoundShapePicker />
  </Provider>,
	document.getElementById('mount')
);
