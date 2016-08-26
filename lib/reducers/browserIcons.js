'use babel';

import R from 'ramda';
import {
  SET_BROWSER_ICON,
  OPEN_URL,
  CLOSE_URL,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_BROWSER_ICON:
      return R.merge(state, {
        [action.id]: action.icon
      });
    // case OPEN_URL:
    //   return uniq(R.append(R.omit(['type'], action), state));
    // case CLOSE_URL:
    //   return R.omit([action.id], state);
    default:
      return state;
  }
};
