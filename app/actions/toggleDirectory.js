'use babel';

import R from 'ramda';
import {
  TOGGLE_DIRECTORY
} from '../constants/actionTypes';

export default (dir) => {
  if (R.contains(dir, atom.project.getPaths())) {
    atom.project.removePath(dir);
  } else {
    atom.project.addPath(dir);
  }
  return {
    type: TOGGLE_DIRECTORY,
    dirs: atom.project.getPaths(),
  };
};
