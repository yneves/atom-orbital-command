'use babel';

import R from 'ramda';
import {
  GIT_COMMIT,
  GIT_STATUS,
  TOGGLE_COMMIT_FILE,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GIT_COMMIT:
      return R.omit([action.repositoryId], state);
    case GIT_STATUS:
      const files = R.map(R.prop('file'), action.status.files);
      const newState = {};
      files.forEach((file) => {
        newState[file] = state[action.repositoryId] &&
          state[action.repositoryId].hasOwnProperty(file) ?
          state[action.repositoryId][file] : true;
      });
      return R.merge(state, {
        [action.repositoryId]: newState,
      });
    case TOGGLE_COMMIT_FILE:
      return R.merge(state, {
        [action.repositoryId]: R.merge(state[action.repositoryId], {
          [action.file]: !state[action.repositoryId][action.file],
        }),
      });
    default:
      return state;
  }
};
