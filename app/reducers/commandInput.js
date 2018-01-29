'use babel';

import lodash from 'lodash';
import {
  SELECT_COMMAND,
  SET_COMMAND_INPUT,
  EXECUTE_COMMAND_START,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case EXECUTE_COMMAND_START:
      return lodash.extend({}, state, {
        [action.repository]: '',
      });
    case SELECT_COMMAND:
    case SET_COMMAND_INPUT:
      return lodash.extend({}, state, {
        [action.repository]: action.command,
      });
    default:
      return state;
  }
};
