'use babel';

import R from 'ramda';
import {
  GIT_COMMIT,
  GIT_STATUS,
  TOGGLE_COMMIT_FILE
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GIT_COMMIT:
      return R.omit([action.repositoryId], state);
    case GIT_STATUS:
      return R.merge(state, {
        [action.repositoryId]: R.map(R.prop('file'), action.status.files)
      });
    case TOGGLE_COMMIT_FILE:
      let files = state[action.repositoryId];
      if (R.contains(action.file, files)) {
        files = R.reject(R.equals(action.file), files);
      } else {
        files = R.append(action.file, files);
      }
      return R.merge(state, {
        [action.repositoryId]: files
      });
    default:
      return state;
  }
};
