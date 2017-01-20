'use babel';

import {
  TERMINAL_OPENED,
} from '../constants/actionTypes';

export default opts => ({
  type: TERMINAL_OPENED,
  ...opts,
});
