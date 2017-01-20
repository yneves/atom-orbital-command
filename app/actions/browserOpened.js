'use babel';

import {
  BROWSER_OPENED,
} from '../constants/actionTypes';

export default ({ id, url }) => ({
  type: BROWSER_OPENED,
  id,
  url,
});
