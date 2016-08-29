'use babel';

import {
  OPEN_BOOKMARK
} from '../constants/actionTypes';

export default (id, url) => {
  atom.workspace.open(url, {id, url});
  return {
    type: OPEN_BOOKMARK,
    id,
    url,
  };
};
