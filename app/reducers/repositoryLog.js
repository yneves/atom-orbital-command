'use babel';

import R from 'ramda';
import {
  GIT_LOG,
  LOAD_WORKSPACES,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_WORKSPACES:
      return {};
    case GIT_LOG:
      return R.merge(state, {
        [action.repositoryId]: action.log
      });
    default:
      return state;
  }
};
