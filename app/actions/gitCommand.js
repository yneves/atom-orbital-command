'use babel';

import cp from 'child_process';
import showNotification from './showNotification';
import {
  GIT_DONE,
  GIT_PROGRESS,
} from '../constants/actionTypes';

export default (repository, commands, notifySuccess, callback) => (dispatch) => {
  let promise = Promise.resolve();
  [].concat(commands).forEach((command) => {
    promise = promise.then(() => new Promise((resolve, reject) => {
      dispatch({
        type: GIT_PROGRESS,
        repositoryId: repository,
        command,
      });
      console.log(repository);
      cp.exec(command, { cwd: repository }, (error, stdout, stderr) => {
        if (notifySuccess || error) {
          showNotification({
            message: command,
            type: error ? 'error' : 'success',
            detail: error ? error.message || stderr : stdout,
          });
        }
        dispatch({
          type: GIT_DONE,
          repositoryId: repository,
          command,
          error,
          stderr,
          stdout,
        });
        if (error) {
          reject(error);
        } else {
          if (callback) {
            callback(stdout);
          }
          resolve(stdout);
        }
      });
    }));
  });
  return promise;
};
