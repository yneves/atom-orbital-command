'use babel';

import {
  TOGGLE_REPOSITORY,
} from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case TOGGLE_REPOSITORY:
      return action.repositories;
    default:
      return state;
  }
};
