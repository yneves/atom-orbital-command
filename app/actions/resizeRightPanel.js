'use babel';

import {
  RESIZE_RIGHT_PANEL,
} from '../constants/actionTypes';

export default (width) => {

  return {
    type: RESIZE_RIGHT_PANEL,
    width,
  };
};
