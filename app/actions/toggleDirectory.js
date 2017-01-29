'use babel';

import R from 'ramda';
import getDirectories from '../../atom/getDirectories';
import getRepositories from '../../atom/getRepositories';
import {
  TOGGLE_DIRECTORY,
  TOGGLE_REPOSITORY,
} from '../constants/actionTypes';

export default dir => (dispatch) => {
  if (dir) {
    if (R.contains(dir, getDirectories())) {
      atom.project.removePath(dir);
    } else {
      atom.project.addPath(dir);
    }
  }
  getRepositories((repositories) => {
    dispatch({
      type: TOGGLE_REPOSITORY,
      repositories,
    });
  });
  dispatch({
    type: TOGGLE_DIRECTORY,
    dirs: getDirectories(),
  });
};
