'use babel';

import R from 'ramda';
import {
  GIT_PROGRESS,
  GIT_COMMIT,
  GIT_STATUS,
  GIT_CHECKOUT,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GIT_STATUS:
    case GIT_COMMIT:
    case GIT_CHECKOUT:
      return R.omit([action.repositoryId], state);
    case GIT_PROGRESS:
      return R.merge(state, {
        [action.repositoryId]: action.command
      });
    default:
      return state;
  }
};