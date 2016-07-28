'use babel';

import {
  TOGGLE_PROJECT,
  SELECT_WORKSPACE,
} from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_WORKSPACE:
      return [];
    case TOGGLE_PROJECT:
      return state.includes(action.id) ?
        state.filter(id => id !== action.id) :
        state.concat(action.id);
    default:
      return state;
  }
};
