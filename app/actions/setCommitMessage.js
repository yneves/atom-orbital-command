'use babel';

import {
  SET_COMMIT_MESSAGE,
} from '../constants/actionTypes';

export default (repository, message) => ({
  type: SET_COMMIT_MESSAGE,
  repository,
  message,
});
