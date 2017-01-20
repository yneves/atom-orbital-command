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
      const getData = R.omit(['type', 'command']);
      const command = R.merge(state[action.command.id], getData(action));
      return R.merge(state, {
        [action.command.id]: command,
      });
    case LOAD_WORKSPACES:
      return {};
    default:
      return state;
  }
};
