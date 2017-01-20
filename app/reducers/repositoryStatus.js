'use babel';

import R from 'ramda';
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
      return R.merge(state, {
        [action.repositoryId]: action.status,
      });
    case GIT_COMMIT:
      return R.omit([action.repositoryId], state);
    default:
      return state;
  }
};
