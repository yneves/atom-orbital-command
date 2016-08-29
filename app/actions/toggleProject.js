'use babel';

import {
  TOGGLE_PROJECT
} from '../constants/actionTypes';

export default (id) => {

  return {
    type: TOGGLE_PROJECT,
    id,
  };
};
