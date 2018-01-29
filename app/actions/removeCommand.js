'use babel';

import {
  REMOVE_COMMAND,
} from '../constants/actionTypes';

export default (repository, input) => ({
  type: REMOVE_COMMAND,
  repository,
  command: input,
});
