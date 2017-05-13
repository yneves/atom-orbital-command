'use babel';

import lodash from 'lodash';
import {
  GIT_COMMIT,
  GIT_STATUS,
  TOGGLE_COMMIT_FILE,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GIT_COMMIT:
      return lodash.omit(state, [action.repositoryId]);
    case GIT_STATUS:
      const files = lodash.map(action.status.files, 'file');
      const newState = {};
      files.forEach((file) => {
        newState[file] = state[action.repositoryId] &&
          (file in state[action.repositoryId]) ?
          state[action.repositoryId][file] : true;
      });
      return lodash.extend({}, state, {
        [action.repositoryId]: newState,
      });
    case TOGGLE_COMMIT_FILE:
      return lodash.extend({}, state, {
        [action.repositoryId]: lodash.extend({}, state[action.repositoryId], {
          [action.file]: !state[action.repositoryId][action.file],
        }),
      });
    default:
      return state;
  }
};
