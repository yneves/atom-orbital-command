'use babel';

import R from 'ramda';
import {
  LOAD_WORKSPACES,
  EXECUTE_COMMAND,
  EXECUTE_COMMAND_FAILED,
  EXECUTE_COMMAND_SUCCESS,
  EXECUTE_COMMAND_PROGRESS,
  KILL_COMMAND,
} from '../constants/actionTypes';

const getData = R.omit(['type', 'command']);

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_WORKSPACES:
      return {};
    case KILL_COMMAND:
    case EXECUTE_COMMAND_FAILED:
    case EXECUTE_COMMAND_SUCCESS:
      return R.omit([action.command.id], state);
    case EXECUTE_COMMAND:
      return R.merge(state, {
        [action.command.id]: getData(action)
      });
    case EXECUTE_COMMAND_PROGRESS:
      if (state[action.command.id]) {
        const command = R.merge(state[action.command.id], getData(action));
        return R.merge(state, {
          [action.command.id]: command
        });
      }
    default:
      return state;
  }
};
