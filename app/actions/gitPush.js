'use babel';

import R from 'ramda';
import cp from 'child_process';
import gitStatus from './gitStatus';
import showNotification from './showNotification';

import {
  GIT_PUSH,
  GIT_PROGRESS,
} from '../constants/actionTypes';

export default (repositoryId, branch, commit) => (dispatch, getState) => {
  const { repositories, repositoryStatus } = getState();
  const repository = R.find(R.propEq('id', repositoryId), repositories);
  const status = repositoryStatus[repositoryId];

  if (!branch) {
    branch = status.remote_branch || status.local_branch;
  }

  const push = commit ? `${commit}:${branch}` : branch;
  const command = `git push origin ${push}`;
  const opts = { cwd: repository.dir };

  dispatch({
    type: GIT_PROGRESS,
    repositoryId,
    command,
  });

  cp.exec(command, opts, (error, stdout, stderr) => {
    showNotification({
      message: error ? `Failed to push ${branch}` : `Pushed ${branch}`,
      type: error ? 'error' : 'success',
      detail: error ? error.message || stderr : stdout,
    });
    if (error) {
      console.error(error, stderr);
    } else {
      dispatch({
        type: GIT_PUSH,
        repositoryId,
        branch,
      });
      gitStatus(repositoryId)(dispatch, getState);
    }
  });
};
