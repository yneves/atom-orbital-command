'use babel';

import {
  REFRESH_TABS,
} from '../constants/actionTypes';

export default (state = 0, action) => {
  switch (action.type) {
    case REFRESH_TABS:
      return state + 1;
    default:
      return state;
  }
};
