'use babel';

import lodash from 'lodash';
import cp from 'child_process';
import showNotification from './showNotification';
import {
  GIT_DONE,
  GIT_PROGRESS,
} from '../constants/actionTypes';

export default (repositoryId, commands, notifySuccess, callback) => (dispatch, getState) => {
  const getCwd = () => {
    const { repositories } = getState();
    const repository = lodash.find(repositories, repo => repo.id === repositoryId);
    return repository.dir;
  };

  let promise = Promise.resolve();
  [].concat(commands).forEach((command) => {
    promise = promise.then(() => new Promise((resolve, reject) => {
      dispatch({
        type: GIT_PROGRESS,
        repositoryId,
        command,
      });
      cp.exec(command, { cwd: getCwd() }, (error, stdout, stderr) => {
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
