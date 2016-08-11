'use babel';

import R from 'ramda';
import {
  LOAD_WORKSPACES,
  EXECUTE_COMMAND,
  EXECUTE_COMMAND_FAILED,
  EXECUTE_COMMAND_SUCCESS,
  KILL_COMMAND,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case KILL_COMMAND:
    case EXECUTE_COMMAND:
    case EXECUTE_COMMAND_FAILED:
      return R.omit([action.command.id], state);
    case EXECUTE_COMMAND_SUCCESS:
      return R.merge({
        [action.command.id]: action.stdout
      }, state);
    case LOAD_WORKSPACES:
      return {};
    default:
      return state;
  }
};
