'use babel';

import {
  TOGGLE_REPOSITORY
} from '../constants/actionTypes';

export default (dir) => {

  return {
    type: TOGGLE_REPOSITORY,
    dir,
  };
};
