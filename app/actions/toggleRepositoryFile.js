'use babel';

import {
  TOGGLE_REPOSITORY_FILE
} from '../constants/actionTypes';

export default (id, file) => {

  return {
    type: TOGGLE_REPOSITORY_FILE,
    id,
    file
  };
};
