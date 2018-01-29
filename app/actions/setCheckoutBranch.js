'use babel';

import {
  SET_CHECKOUT_BRANCH,
} from '../constants/actionTypes';

export default (repository, branch) => ({
  type: SET_CHECKOUT_BRANCH,
  repository,
  branch,
});
