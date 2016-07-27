'use babel';

import R from 'ramda';
import {
  EXECUTE_COMMAND,
  EXECUTE_COMMAND_FAILED,
  EXECUTE_COMMAND_SUCCESS,
  KILL_COMMAND,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case KILL_COMMAND:
    case EXECUTE_COMMAND_FAILED:
    case EXECUTE_COMMAND_SUCCESS:
      return R.omit([action.command.id], state);
    case EXECUTE_COMMAND:
      return R.merge({
        [action.command.id]: action.pid
      }, state);
    default:
      return state;
  }
};
