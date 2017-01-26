'use babel';

import R from 'ramda';
import {
  GIT_DONE,
  GIT_PROGRESS,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  const list = state[action.repositoryId] || [];
  switch (action.type) {
    case GIT_DONE:
      return R.merge(state, {
        [action.repositoryId]: R.without([action.command], list),
      });
    case GIT_PROGRESS:
      list.push(action.command);
      return R.merge(state, {
        [action.repositoryId]: list,
      });
    default:
      return state;
  }
};
