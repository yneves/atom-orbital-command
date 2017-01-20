'use babel';

import {
  SET_CHECKOUT_BRANCH,
} from '../constants/actionTypes';

export default (repositoryId, branch) => ({
  type: SET_CHECKOUT_BRANCH,
  repositoryId,
  branch,
});
