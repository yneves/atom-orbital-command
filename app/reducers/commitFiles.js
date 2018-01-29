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
      return lodash.omit(state, [action.repository]);
    case GIT_STATUS:
      const files = lodash.map(action.status.files, 'file');
      const newState = {};
      files.forEach((file) => {
        newState[file] = state[action.repository] &&
          (file in state[action.repository]) ?
          state[action.repository][file] : true;
      });
      return lodash.extend({}, state, {
        [action.repository]: newState,
      });
    case TOGGLE_COMMIT_FILE:
      return lodash.extend({}, state, {
        [action.repository]: lodash.extend({}, state[action.repository], {
          [action.file]: !state[action.repository][action.file],
        }),
      });
    default:
      return state;
  }
};
