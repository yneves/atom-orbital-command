'use babel';

import {
  SET_CHECKOUT_BRANCH
} from '../constants/actionTypes';

export default (repositoryId, branch) => {

  return {
    type: SET_CHECKOUT_BRANCH,
    repositoryId,
    branch,
  };
};
