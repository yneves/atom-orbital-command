'use babel';

import lodash from 'lodash';
import getDirectories from '../../atom/getDirectories';

export default dir => () => {
  if (lodash.includes(getDirectories(), dir)) {
    atom.project.removePath(dir);
  } else {
    atom.project.addPath(dir);
  }
};
