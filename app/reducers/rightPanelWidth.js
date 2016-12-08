'use babel';

import {
  RESIZE_RIGHT_PANEL
} from '../constants/actionTypes';

export default (state = 300, action) => {
  switch (action.type) {
    case RESIZE_RIGHT_PANEL:
      return action.width;
    default:
      return state;
  }
};
