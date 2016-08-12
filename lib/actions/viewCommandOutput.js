'use babel';

import {
  EDIT_FILE
} from '../constants/actionTypes';

export default (id) => (dispatch, getState) => {

  const {
    runningCommands,
    finishedCommands,
    failedCommands,
  } = getState();
  const running = runningCommands[id];
  const finished = finishedCommands[id];
  const failed = failedCommands[id];

  const text = running ? getRunningText(running) : (finished || failed);

  const options = {
    pending: true
  };

  atom.workspace.open(null, options).then(editor => {
    editor.setText(text);
  });
};

const getRunningText = (running) => {
  return 'STDOUT:\n------\n\n' +
    running.stdout +
    'STDERR:\n------\n\n' +
    running.stderr;
};
