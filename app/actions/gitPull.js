'use babel';

import R from 'ramda';
import cp from 'child_process';
import { remote } from 'electron';
import gitStatus from './gitStatus';
import showNotification from './showNotification';
import {
  GIT_PULL,
  GIT_PROGRESS,
} from '../constants/actionTypes';

export default repositoryId => (dispatch, getState) => {
  const { repositories, repositoryStatus } = getState();
  const status = repositoryStatus[repositoryId];
  const branch = status.local_branch;
  const repository = R.find(R.propEq('id', repositoryId), repositories);

  const gitCommand = `git pull origin ${branch}`;

  const command = R.join(' && ', R.reject(R.isEmpty, [
    `cd ${repository.dir}`,
    gitCommand,
  ]));

  dispatch({
    type: GIT_PROGRESS,
    repositoryId,
    command: gitCommand,
  });

  cp.exec(command, {}, (error, stdout, stderr) => {
    showNotification({
      message: error ? 'Pull failed' : 'Pulled successfuly',
      type: error ? 'error' : 'success',
      detail: error ? error.message || stderr : stdout,
    });
    if (!error) {
      dispatch({
        type: GIT_PULL,
        repositoryId,
        branch,
      });
      gitStatus(repositoryId)(dispatch, getState);
    }
  });
};
