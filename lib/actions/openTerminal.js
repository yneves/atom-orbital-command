'use babel';

import sh from '../utils/sh';
import {
  OPEN_TERMINAL
} from '../constants/actionTypes';

export default (dir) => (dispatch) => {

  const target = document.getElementById('chloe');
  const script = `cd ${dir}`;

  sh.set(script, (error) => {
    if (!error) {

      atom.commands.dispatch(target, 'term3:open');

      dispatch({
        type: OPEN_TERMINAL,
        dir,
      });

      setTimeout(sh.clear, 1500);
    }
  });
};
