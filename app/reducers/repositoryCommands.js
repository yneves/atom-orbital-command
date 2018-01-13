'use babel';

import {
  EXECUTE_COMMAND_START,
  EXECUTE_COMMAND_FAILED,
  EXECUTE_COMMAND_PROGRESS,
  EXECUTE_COMMAND_SUCCESS,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case EXECUTE_COMMAND_START:
    case EXECUTE_COMMAND_FAILED:
    case EXECUTE_COMMAND_PROGRESS:
    case EXECUTE_COMMAND_SUCCESS:
      const commands = state[action.repositoryId] || {};
      const command = commands[action.input] || {};
      return Object.assign({}, state, {
        [action.repositoryId]: Object.assign({}, commands, {
          [action.input]: Object.assign({}, command, action),
        }),
      });
    default:
      return state;
  }
};
