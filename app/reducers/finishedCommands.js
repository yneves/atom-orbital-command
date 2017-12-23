'use babel';

import lodash from 'lodash';
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
      return lodash.omit(state, [action.command.id]);
    case EXECUTE_COMMAND_SUCCESS:
      const command = lodash.extend(
        {},
        state[action.command.id],
        lodash.omit(action, ['type', 'command'])
      );
      return lodash.extend({}, state, {
        [action.command.id]: command,
      });
    case LOAD_WORKSPACES:
      return {};
    default:
      return state;
  }
};
