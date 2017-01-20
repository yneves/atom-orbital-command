'use babel';

import {
  RESIZE_RIGHT_PANEL,
} from '../constants/actionTypes';

export default width => ({
  type: RESIZE_RIGHT_PANEL,
  width,
});
