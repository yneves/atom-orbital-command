'use babel';

import R from 'ramda';
import {
  GIT_STATUS,
  SET_CHECKOUT_BRANCH,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GIT_STATUS:
      return R.merge(state, {
        [action.repositoryId]: action.status.local_branch
      });
    case SET_CHECKOUT_BRANCH:
      return R.merge(state, {
        [action.repositoryId]: action.branch
      });
    default:
      return state;
  }
};
