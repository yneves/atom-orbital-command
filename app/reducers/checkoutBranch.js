'use babel';

import lodash from 'lodash';
import {
  GIT_STATUS,
  GIT_CHECKOUT,
  SET_CHECKOUT_BRANCH,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GIT_STATUS:
    case GIT_CHECKOUT:
      return lodash.extend({}, state, {
        [action.repositoryId]: '',
      });
    case SET_CHECKOUT_BRANCH:
      return lodash.extend({}, state, {
        [action.repositoryId]: action.branch,
      });
    default:
      return state;
  }
};
