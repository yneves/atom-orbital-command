'use babel';

import R from 'ramda';
import {
  TOGGLE_SECTION
} from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case TOGGLE_SECTION:
      return state.includes(action.section) ?
        R.uniq(R.reject(R.equals(action.section), state)) :
        R.uniq(state.concat(action.section));
    default:
      return state;
  }
};
