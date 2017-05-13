'use babel';

import lodash from 'lodash';
import cp from 'child_process';
import showNotification from './showNotification';
import {
  GIT_DONE,
  GIT_PROGRESS,
} from '../constants/actionTypes';

export default (repositoryId, command, notifySuccess, callback) => (dispatch, getState) => {
  const { repositories } = getState();
  const repository = lodash.find(repositories, repo => repo.id === repositoryId);
  if (!repository) {
    return;
  }
  const opts = { cwd: repository.dir };

  dispatch({
    type: GIT_PROGRESS,
    repositoryId,
    command,
  });

  cp.exec(command, opts, (error, stdout, stderr) => {
    if (notifySuccess || error) {
      showNotification({
        message: command,
        type: error ? 'error' : 'success',
        detail: error ? error.message || stderr : stdout,
      });
    }
    dispatch({
      type: GIT_DONE,
      repositoryId,
      command,
      error,
      stderr,
      stdout,
    });
    if (!error) {
      callback(stdout);
    }
  });
};
