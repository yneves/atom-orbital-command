'use babel';

import R from 'ramda';
import {
  TOGGLE_DIRECTORY
} from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case TOGGLE_DIRECTORY:
      return action.dirs;
    default:
      return state;
  }
};
