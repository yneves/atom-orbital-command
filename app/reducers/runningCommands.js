'use babel';

import lodash from 'lodash';

import {
  LOAD_WORKSPACES,
  EXECUTE_COMMAND,
  EXECUTE_COMMAND_FAILED,
  EXECUTE_COMMAND_SUCCESS,
  EXECUTE_COMMAND_PROGRESS,
  KILL_COMMAND,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_WORKSPACES:
      return {};
    case KILL_COMMAND:
    case EXECUTE_COMMAND_FAILED:
    case EXECUTE_COMMAND_SUCCESS:
      console.log(action);
      return lodash.omit(state, [action.command.id]);
    case EXECUTE_COMMAND:
      return lodash.extend({}, state, {
        [action.command.id]: lodash.omit(action, ['type']),
      });
    case EXECUTE_COMMAND_PROGRESS:
      if (state[action.command.id]) {
        const command = lodash.extend(
          {},
          state[action.command.id],
          lodash.omit(action, ['type'])
        );
        return lodash.extend({}, state, {
          [action.command.id]: command,
        });
      }
      return state;
    default:
      return state;
  }
};
