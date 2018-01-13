'use babel';

import {
  SELECT_COMMAND,
} from '../constants/actionTypes';

export default (repositoryId, input) => ({
  type: SELECT_COMMAND,
  repositoryId,
  command: input,
});
