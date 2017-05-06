'use babel';

import R from 'ramda';
import getDirectories from '../../atom/getDirectories';

export default dir => () => {
  if (R.contains(dir, getDirectories())) {
    atom.project.removePath(dir);
  } else {
    atom.project.addPath(dir);
  }
};
