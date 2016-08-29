'use babel';

import R from 'ramda';
import {
  OPEN_URL,
  CLOSE_URL,
} from '../constants/actionTypes';

const uniq = R.uniqBy(R.prop('id'));

export default (state = [], action) => {
  switch (action.type) {
    case OPEN_URL:
      return uniq(R.append(R.omit(['type'], action), state));
    case CLOSE_URL:
      return uniq(R.reject(R.propEq('id', action.id), state));
    default:
      return state;
  }
};
