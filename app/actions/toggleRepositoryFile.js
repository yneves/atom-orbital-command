'use babel';

import {
  TOGGLE_REPOSITORY_FILE,
} from '../constants/actionTypes';

export default (id, file) => ({
  type: TOGGLE_REPOSITORY_FILE,
  id,
  file,
});
