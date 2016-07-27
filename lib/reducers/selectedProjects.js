'use babel';

import {
  TOGGLE_PROJECT
} from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case TOGGLE_PROJECT:
      return state.includes(action.id) ?
        state.filter(id => id !== action.id) :
        state.concat(action.id);
    default:
      return state;
  }
};
