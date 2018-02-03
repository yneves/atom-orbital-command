'use babel';

import getRepositories from '../../atom/getRepositories';
import {
  SET_OPEN_REPOSITORIES,
} from '../constants/actionTypes';

export default () => (dispatch) => {
  getRepositories((repositories) => {
    dispatch({
      type: SET_OPEN_REPOSITORIES,
      repositories,
    });
  });
};
