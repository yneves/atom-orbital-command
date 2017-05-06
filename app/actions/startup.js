'use babel';

import { STARTUP } from '../constants/actionTypes';

export default () => (dispatch) => {
  dispatch({
    type: STARTUP,
  });
};
