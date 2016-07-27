'use babel';

import {
  OPEN_TERMINAL
} from '../constants/actionTypes';

export default (dir) => {

  process.env.CHLOE_TERM_DIR = dir;

  const target = document.getElementById('chloe');
  atom.commands.dispatch(target, 'term3:open');

  return {
    type: OPEN_TERMINAL,
    dir,
  };
};
