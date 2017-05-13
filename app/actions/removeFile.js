'use babel';

import fs from 'fs';
import fileSaved from './fileSaved';
import {
  REMOVE_FILE,
} from '../constants/actionTypes';

export default file => (dispatch) => {
  fs.unlink(file, (error) => {
    if (!error) {
      dispatch(fileSaved(file));
      dispatch({
        type: REMOVE_FILE,
        file,
      });
    }
  });
};
