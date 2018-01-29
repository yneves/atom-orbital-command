'use babel';

import lodash from 'lodash';
import {
  GIT_FETCH,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GIT_FETCH:
      return lodash.extend({}, state, {
        [action.repository]: action.head,
      });
    default:
      return state;
  }
};
