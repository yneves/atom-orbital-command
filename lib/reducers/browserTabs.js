'use babel';

import R from 'ramda';
import {
  OPEN_URL,
  CLOSE_URL,
} from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case OPEN_URL:
      return R.append(R.omit(['type'], action), state);
    case CLOSE_URL:
      return R.reject(R.propEq('id', action.id), state);
    default:
      return state;
  }
};
