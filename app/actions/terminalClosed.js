'use babel';

import {
  TERMINAL_CLOSED
} from '../constants/actionTypes';

export default (opts) => {

  return {
    type: TERMINAL_CLOSED,
    ...opts,
  };
};
