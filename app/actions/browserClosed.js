'use babel';

import {
  BROWSER_CLOSED,
} from '../constants/actionTypes';

export default ({ id }) => ({
  type: BROWSER_CLOSED,
  id,
});
