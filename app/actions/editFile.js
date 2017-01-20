'use babel';

import {
  EDIT_FILE,
} from '../constants/actionTypes';

export default (file) => {
  atom.workspace.open(file);
  return {
    type: EDIT_FILE,
    file,
  };
};
