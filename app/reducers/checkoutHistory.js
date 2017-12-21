'use babel';

import lodash from 'lodash';
import {
  GIT_CHECKOUT,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GIT_CHECKOUT:
      const branches = [action.branch].concat(state[action.repositoryId])
        .filter(value => !!value);
      return lodash.extend({}, state, {
        [action.repositoryId]: lodash.uniq(branches).slice(0, 10),
      });
    default:
      return state;
  }
};
