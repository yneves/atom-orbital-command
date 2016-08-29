'use babel';

import {
  OPEN_URL
} from '../constants/actionTypes';

export default ({id, url}) => {

  return {
    type: OPEN_URL,
    id,
    url,
  };
};
