'use babel';

import {
  TERMINAL_ACTIVE,
} from '../constants/actionTypes';

export default active => ({
  type: TERMINAL_ACTIVE,
  active,
});
