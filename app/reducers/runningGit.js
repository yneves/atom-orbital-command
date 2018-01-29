'use babel';

import lodash from 'lodash';
import {
  GIT_DONE,
  GIT_PROGRESS,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GIT_DONE: {
      const list = state[action.repository] || [];
      return lodash.extend({}, state, {
        [action.repository]: lodash.without(list, action.command),
      });
    }
    case GIT_PROGRESS: {
      return lodash.extend({}, state, {
        [action.repository]: (state[action.repository] || []).concat(action.command),
      });
    }
    default:
      return state;
  }
};
