'use babel';

import {
  BROWSER_CLOSED
} from '../constants/actionTypes';

export default ({id}) => {

  return {
    type: BROWSER_CLOSED,
    id,
  };
};
