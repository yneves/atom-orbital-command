'use babel';

import {
  SELECT_WORKSPACE,
} from '../constants/actionTypes';

export default id => ({
  type: SELECT_WORKSPACE,
  id,
});
