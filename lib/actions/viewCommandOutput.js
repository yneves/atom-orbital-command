'use babel';

import {
  EDIT_FILE
} from '../constants/actionTypes';

export default (id) => (dispatch, getState) => {

  const running = getState().runningCommands[id];
  const finished = getState().finishedCommands[id];
  const failed = getState().failedCommands[id];

  const text = running ?
    (running.stdout || running.stderr) :
    (finished || failed);

  const options = {
    pending: true
  };

  atom.workspace.open(null, options).then(editor => {
    editor.setText(text);
  });
};
