'use babel';

import {
  SET_OPEN_REPOSITORIES,
} from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case SET_OPEN_REPOSITORIES:
      return action.repositories;
    default:
      return state;
  }
};
