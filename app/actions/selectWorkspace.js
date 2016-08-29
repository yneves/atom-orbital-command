'use babel';

import {
  SELECT_WORKSPACE
} from '../constants/actionTypes';

export default (id) => {

  return {
    type: SELECT_WORKSPACE,
    id,
  };
};
