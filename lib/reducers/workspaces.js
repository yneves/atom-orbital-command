'use babel';

import {
  LOAD_WORKSPACES,
} from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_WORKSPACES:
      return action.workspaces;
    default:
      return state;
  }
};
