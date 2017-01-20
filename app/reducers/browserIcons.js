'use babel';

import R from 'ramda';
import {
  SET_BROWSER_ICON,
  BROWSER_OPENED,
  BROWSER_CLOSED,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_BROWSER_ICON:
      return R.merge(state, {
        [action.id]: action.icon,
      });
    // case BROWSER_OPENED:
    //   return uniq(R.append(R.omit(['type'], action), state));
    // case BROWSER_CLOSED:
    //   return R.omit([action.id], state);
    default:
      return state;
  }
};
