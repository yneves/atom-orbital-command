'use babel';

import R from 'ramda';
import {
  EXECUTE_COMMAND,
  EXECUTE_COMMAND_FAILED,
  EXECUTE_COMMAND_SUCCESS,
  EXECUTE_COMMAND_PROGRESS,
  KILL_COMMAND,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case KILL_COMMAND:
    case EXECUTE_COMMAND_FAILED:
    case EXECUTE_COMMAND_SUCCESS:
      return R.omit([action.command.id], state);
    case EXECUTE_COMMAND_PROGRESS:
      return R.merge({
        [action.command.id]: {stdout: action.stdout}
      }, state);
    case EXECUTE_COMMAND:
      return R.merge({
        [action.command.id]: {pid: action.pid}
      }, state);
    default:
      return state;
  }
};
