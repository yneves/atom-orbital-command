'use babel';

import {
  SELECT_COMMAND,
} from '../constants/actionTypes';

export default (repository, input) => ({
  type: SELECT_COMMAND,
  repository,
  command: input,
});
