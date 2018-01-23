'use babel';

import path from 'path';
import {
  TOGGLE_REPOSITORY,
} from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case TOGGLE_REPOSITORY:
      return action.repositories.map(dir => ({
        id: dir,
        dir,
        name: path.basename(dir),
      }));
    default:
      return state;
  }
};
