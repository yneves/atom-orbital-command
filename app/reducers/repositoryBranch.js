'use babel';

import lodash from 'lodash';
import {
  GIT_BRANCH,
  LOAD_WORKSPACES,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_WORKSPACES:
      return {};
    case GIT_BRANCH:
      return lodash.extend({}, state, {
        [action.repositoryId]: action.branches,
      });
    default:
      return state;
  }
};
