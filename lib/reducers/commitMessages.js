'use babel';

import R from 'ramda';
import {
  GIT_COMMIT,
  SET_COMMIT_MESSAGE
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GIT_COMMIT:
      return R.omit([action.repositoryId], state);
    case SET_COMMIT_MESSAGE:
      return R.merge(state, { [action.repositoryId]: action.message });
    default:
      return state;
  }
};
