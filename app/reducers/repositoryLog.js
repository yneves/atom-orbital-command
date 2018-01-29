'use babel';

import lodash from 'lodash';
import {
  GIT_LOG,
  LOAD_WORKSPACES,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_WORKSPACES:
      return {};
    case GIT_LOG:
      return lodash.extend({}, state, {
        [action.repository]: action.log,
      });
    default:
      return state;
  }
};
