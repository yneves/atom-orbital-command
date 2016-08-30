'use babel';

import R from 'ramda';
import {
  BROWSER_OPENED,
  BROWSER_CLOSED,
} from '../constants/actionTypes';

const uniq = R.uniqBy(R.prop('id'));

export default (state = [], action) => {
  switch (action.type) {
    case BROWSER_OPENED:
      return uniq(R.append(R.omit(['type'], action), state));
    case BROWSER_CLOSED:
      return uniq(R.reject(R.propEq('id', action.id), state));
    default:
      return state;
  }
};
