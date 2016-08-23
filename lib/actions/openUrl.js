'use babel';

import {
  OPEN_URL
} from '../constants/actionTypes';

export default (url, id) => {

  const pane = atom.workspace.paneForURI(id);
  const item = pane.itemForURI(id);
  const index = pane.getItems().length - 1;
  pane.moveItem(item, index);

  return {
    type: OPEN_URL,
    id,
    url,
  };
};
