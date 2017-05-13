'use babel';

import lodash from 'lodash';
import {
  TOGGLE_SECTION,
  LOAD_WORKSPACES,
} from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_WORKSPACES:
      return [];
    case TOGGLE_SECTION:
      return lodash.includes(state, action.section) ?
        lodash.without(state, action.section) :
        state.concat(action.section);
    default:
      return state;
  }
};
