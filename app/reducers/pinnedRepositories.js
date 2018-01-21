'use babel';

import {
  PIN_REPOSITORY,
} from '../constants/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case PIN_REPOSITORY:
      if (state.includes(action.repository)) {
        return state.filter(repo => repo !== action.repository);
      }
      return state.concat(action.repository);
    default:
      return state;
  }
};
