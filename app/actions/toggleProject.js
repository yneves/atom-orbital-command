'use babel';

import {
  TOGGLE_PROJECT,
} from '../constants/actionTypes';

export default id => ({
  type: TOGGLE_PROJECT,
  id,
});
