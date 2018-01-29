'use babel';

import lodash from 'lodash';
import {
  GIT_DONE,
  GIT_PROGRESS,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  const list = state[action.repository] || [];
  switch (action.type) {
    case GIT_DONE:
      return lodash.extend({}, state, {
        [action.repository]: lodash.without(list, action.command),
      });
    case GIT_PROGRESS:
      list.push(action.command);
      return lodash.extend({}, state, {
        [action.repository]: list,
      });
    default:
      return state;
  }
};
