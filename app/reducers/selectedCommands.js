'use babel';

import {
  SELECT_COMMAND,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_COMMAND:
      return Object.assign({}, state, {
        [action.repositoryId]: action.command,
      });
    default:
      return state;
  }
};
