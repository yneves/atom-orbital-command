'use babel';

import {
  SET_COMMAND_INPUT,
} from '../constants/actionTypes';

export default (repository, command) => ({
  type: SET_COMMAND_INPUT,
  repository,
  command,
});
