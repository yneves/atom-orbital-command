'use babel';

import {
  SELECT_WORKSPACE
} from '../constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case SELECT_WORKSPACE:
      return state === action.id ? null : action.id;
    default:
      return state;
  }
};
