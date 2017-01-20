'use babel';

import {
  TOGGLE_COMMIT_FILE,
} from '../constants/actionTypes';

export default (repositoryId, file) => ({
  type: TOGGLE_COMMIT_FILE,
  repositoryId,
  file,
});
