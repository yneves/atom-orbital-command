'use babel';

import {
  TERMINAL_OPENED
} from '../constants/actionTypes';

export default (opts) => {

  return {
    type: TERMINAL_OPENED,
    ...opts,
  };
};
