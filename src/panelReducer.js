import _ from 'lodash';

const actionTypes = {
  UPDATE_SHAPE: 'UPDATE_SHAPE',
};

const defaultState = {
  selectedShape: 'circle',
};
function panelReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_SHAPE: {
      const newState = _.clone(state);
      newState.selectedShape = action.value;
      return newState;
    }
    default: {
      return state;
    }
  }
}

export default panelReducer;
export const updateShape = value => ({ type: actionTypes.UPDATE_SHAPE, value });
