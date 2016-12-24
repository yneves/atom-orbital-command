'use babel';

import {
  TERMINAL_ACTIVE
} from '../constants/actionTypes';

export default (active) => {

  return {
    type: TERMINAL_ACTIVE,
    active,
  };
};
