'use babel';

import {
  TERMINAL_ACTIVE
} from '../constants/actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case TERMINAL_ACTIVE:
      return action.active;
    default:
      return state;
  }
};
