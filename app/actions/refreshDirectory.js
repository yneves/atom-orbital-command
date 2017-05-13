'use babel';

import getDirectories from '../../atom/getDirectories';
import getRepositories from '../../atom/getRepositories';
import {
  TOGGLE_DIRECTORY,
  TOGGLE_REPOSITORY,
} from '../constants/actionTypes';

export default () => (dispatch) => {
  getRepositories((repositories) => {
    dispatch({
      type: TOGGLE_REPOSITORY,
      repositories,
    });
    dispatch({
      type: TOGGLE_DIRECTORY,
      dirs: getDirectories(),
    });
  });
};
