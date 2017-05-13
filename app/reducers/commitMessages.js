'use babel';

import lodash from 'lodash';
import {
  GIT_COMMIT,
  GIT_CHECKOUT,
  SET_COMMIT_MESSAGE,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GIT_COMMIT:
      return lodash.omit(state, [action.repositoryId]);
    case SET_COMMIT_MESSAGE:
      return lodash.extend({}, state, {
        [action.repositoryId]: action.message,
      });
    case GIT_CHECKOUT:
      return {};
    default:
      return state;
  }
};
