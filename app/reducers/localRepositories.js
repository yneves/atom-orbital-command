'use babel';

import {
  FIND_REPOSITORIES_START,
  FIND_REPOSITORIES_FAILED,
  FIND_REPOSITORIES_SUCCESS,
} from '../constants/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FIND_REPOSITORIES_FAILED:
      return state;
    case FIND_REPOSITORIES_START:
      return initialState;
    case FIND_REPOSITORIES_SUCCESS:
      return action.repositories;
    default:
      return state;
  }
};
