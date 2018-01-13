'use babel';

import {
  SET_COMMAND_INPUT,
} from '../constants/actionTypes';

export default (repositoryId, command) => ({
  type: SET_COMMAND_INPUT,
  repositoryId,
  command,
});
