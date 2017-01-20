'use babel';

import {
  TOGGLE_SECTION,
} from '../constants/actionTypes';

export default section => ({
  type: TOGGLE_SECTION,
  section,
});
