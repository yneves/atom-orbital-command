'use babel';

import R from 'ramda';
import {
  GIT_BRANCH,
  LOAD_WORKSPACES,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_WORKSPACES:
      return {};
    case GIT_BRANCH:
      return R.merge(state, {
        [action.repositoryId]: action.branches
      });
    default:
      return state;
  }
};
