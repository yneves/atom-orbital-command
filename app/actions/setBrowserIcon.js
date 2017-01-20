'use babel';

import {
  SET_BROWSER_ICON,
} from '../constants/actionTypes';

export default (id, icon) => ({
  type: SET_BROWSER_ICON,
  id,
  icon,
});
