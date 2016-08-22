'use babel';

import {
  OPEN_URL
} from '../constants/actionTypes';

export default (url, id) => {

  return {
    type: OPEN_URL,
    id,
    url,
  };
};
