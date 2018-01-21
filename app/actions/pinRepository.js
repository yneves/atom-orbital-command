'use babel';

import {
  PIN_REPOSITORY,
} from '../constants/actionTypes';

export default repository => ({
  type: PIN_REPOSITORY,
  repository,
});
