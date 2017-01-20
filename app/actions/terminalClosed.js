'use babel';

import {
  TERMINAL_CLOSED,
} from '../constants/actionTypes';

export default opts => ({
  type: TERMINAL_CLOSED,
  ...opts,
});
