'use babel';

import {
  TOGGLE_COMMIT_FILE,
} from '../constants/actionTypes';

export default (repository, file) => ({
  type: TOGGLE_COMMIT_FILE,
  repository,
  file,
});
