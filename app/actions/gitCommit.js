'use babel';

import R from 'ramda';
import gitCommand from './gitCommand';
import gitStatus from './gitStatus';
import { GIT_COMMIT } from '../constants/actionTypes';

export default repositoryId => (dispatch, getState) => {
  const { repositoryStatus, commitMessages, commitFiles } = getState();
  const message = commitMessages[repositoryId];
  const status = repositoryStatus[repositoryId];
  const files = R.keys(commitFiles[repositoryId])
    .filter(file => !!commitFiles[repositoryId][file]);

  const rmFiles = files.filter((file) => {
    const entry = R.find(R.propEq('file', file), status.files);
    return entry.status === 'deleted';
  });

  const addFiles = files.filter((file) => {
    const entry = R.find(R.propEq('file', file), status.files);
    return entry.status !== 'deleted';
  });

  const command = R.join(' && ', R.reject(R.isEmpty, [
    rmFiles.length ? `git rm ${rmFiles.join(' ')}` : '',
    addFiles.length ? `git add ${addFiles.join(' ')}` : '',
    `git commit -m "${message}"`,
  ]));

  gitCommand(repositoryId, command, () => {
    dispatch({
      type: GIT_COMMIT,
      repositoryId,
    });
    gitStatus(repositoryId)(dispatch, getState);
  })(dispatch, getState);
};
