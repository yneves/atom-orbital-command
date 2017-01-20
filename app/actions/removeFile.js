'use babel';

import fs from 'fs';
import fileSaved from './fileSaved';
import {
  REMOVE_FILE,
} from '../constants/actionTypes';

export default file => (dispatch, getState) => {
  fs.unlink(file, (error) => {
    if (error) {
      console.error(error);
    }
  });
  fileSaved(file)(dispatch, getState);
  dispatch({
    type: REMOVE_FILE,
    file,
  });
};
