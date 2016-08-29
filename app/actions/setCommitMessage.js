'use babel';

import {
  SET_COMMIT_MESSAGE
} from '../constants/actionTypes';

export default (repositoryId, message) => {

  return {
    type: SET_COMMIT_MESSAGE,
    repositoryId,
    message,
  };
};
