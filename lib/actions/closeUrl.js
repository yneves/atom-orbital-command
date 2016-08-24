'use babel';

import {
  CLOSE_URL
} from '../constants/actionTypes';

export default ({id}) => {

  return {
    type: CLOSE_URL,
    id,
  };
};
