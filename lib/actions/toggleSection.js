'use babel';

import {
  TOGGLE_SECTION
} from '../constants/actionTypes';

export default (section) => {

  return {
    type: TOGGLE_SECTION,
    section,
  };
};
