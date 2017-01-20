'use babel';

import R from 'ramda';

import {
  EDIT_FILE,
} from '../constants/actionTypes';

export default id => (dispatch, getState) => {
  const {
    runningCommands,
    finishedCommands,
    failedCommands,
  } = getState();

  const running = runningCommands[id];
  const finished = finishedCommands[id];
  const failed = failedCommands[id];
  const text = getText(running || failed || finished);

  const options = {
    pending: true,
  };

  atom.workspace.open(null, options).then((editor) => {
    editor.setText(text);
  });
};

const getText = data => R.join('\n\n', R.toPairs(data).map(item => `${item[0].toUpperCase()}:\n` +
      `------------------------\n${
      item[1]}`));
