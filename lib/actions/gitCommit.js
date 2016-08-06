'use babel';

import R from 'ramda';
import cp from 'child_process';
import { GIT_COMMIT } from '../constants/actionTypes';
import showNotification from './showNotification';
import gitStatus from './gitStatus';

export default (repositoryId, message) => (dispatch, getState) => {

  const {
    repositories,
    repositoryStatus,
    commitMessages,
    commitFiles
  } = getState();

  const repository = R.find(R.propEq('id', repositoryId), repositories);

  const files = commitFiles[repositoryId];
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

  cp.exec(command, {}, (error, stdout, stderr) => {
    showNotification({
      message: error ? 'Commit failed' : 'Commit done',
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
