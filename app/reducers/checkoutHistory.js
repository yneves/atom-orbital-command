'use babel';

import lodash from 'lodash';
import {
  GIT_BRANCH,
  GIT_CHECKOUT,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GIT_BRANCH:
      if (!state[action.repository]) {
        return state;
      }
      return lodash.extend({}, state, {
        [action.repository]: state[action.repository]
          .filter(branch => lodash.includes(action.branches, branch)),
      });
    case GIT_CHECKOUT:
      const branches = [action.branch].concat(state[action.repository])
        .filter(value => !!value);
      return lodash.extend({}, state, {
        [action.repository]: lodash.uniq(branches).slice(0, 10),
      });
    default:
      return state;
  }
};
