'use babel';

import {
  OPEN_BOOKMARK,
} from '../constants/actionTypes';

export default (id, url) => (dispatch, getState) => {
  atom.workspace.open(url, { id, url });
  dispatch({
    type: OPEN_BOOKMARK,
    id,
    url,
  });
};
