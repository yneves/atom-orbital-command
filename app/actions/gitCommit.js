'use babel';

import R from 'ramda';
import cp from 'child_process';
import showNotification from './showNotification';
import gitStatus from './gitStatus';
import {
  GIT_COMMIT,
  GIT_PROGRESS,
} from '../constants/actionTypes';

export default (repositoryId, message) => (dispatch, getState) => {

  const {
    repositories,
    repositoryStatus,
    commitMessages,
    commitFiles
  } = getState();

  const repository = R.find(R.propEq('id', repositoryId), repositories);

  const files = R.keys(commitFiles[repositoryId])
    .filter(file => !!commitFiles[repositoryId]);
  const message = commitMessages[repositoryId];
  const status = repositoryStatus[repositoryId];

  const branch = status.remote_branch ?
    status.remote_branch.replace(/\//, ' ')
    : 'origin ' + status.local_branch;

  const rmFiles = files.filter(file => {
    const entry = R.find(R.propEq('file', file), status.files);
    return entry.status === 'deleted';
  });

  const addFiles = files.filter(file => {
    const entry = R.find(R.propEq('file', file), status.files);
    return entry.status !== 'deleted';
  });

  const command = R.join(' && ', R.reject(R.isEmpty, [
    'cd ' + repository.dir,
    rmFiles.length ? 'git rm ' + rmFiles.join(' ') : '',
    addFiles.length ? 'git add ' + addFiles.join(' ') : '',
    'git commit -m "' + message + '"',
    'git push ' + branch
  ]));

  dispatch({
    type: GIT_PROGRESS,
    repositoryId,
    command,
  });

  cp.exec(command, {}, (error, stdout, stderr) => {
    showNotification({
      message: error ? 'Commit failed' : 'Commit pushed',
      type: error ? 'error' : 'success',
      detail: error ? error.message || stderr : stdout
    });
    if (!error) {
      dispatch({
        type: GIT_COMMIT,
        repositoryId,
      });
      gitStatus(repositoryId)(dispatch, getState);
    }
  });
};
