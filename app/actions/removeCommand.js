'use babel';

import {
  REMOVE_COMMAND,
} from '../constants/actionTypes';

export default (repositoryId, input) => ({
  type: REMOVE_COMMAND,
  repositoryId,
  command: input,
});
