'use babel';

import lodash from 'lodash';
import {
  GIT_STATUS,
  GIT_COMMIT,
  LOAD_WORKSPACES,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_WORKSPACES:
      return {};
    case GIT_STATUS:
      return lodash.extend({}, state, {
        [action.repository]: action.status,
      });
    case GIT_COMMIT:
      return lodash.omit(state, [action.repository]);
    default:
      return state;
  }
};
