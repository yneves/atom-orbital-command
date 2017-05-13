'use babel';

import lodash from 'lodash';
import gitCommand from './gitCommand';
import gitStatus from './gitStatus';
import { GIT_COMMIT } from '../constants/actionTypes';

const findByFile = (list, file) => lodash.find(list, item => item.file === file);

export default repositoryId => (dispatch, getState) => {
  const { repositoryStatus, commitMessages, commitFiles } = getState();
  const message = commitMessages[repositoryId];
  const status = repositoryStatus[repositoryId];
  const files = lodash.keys(commitFiles[repositoryId])
    .filter(file => !!commitFiles[repositoryId][file]);

  const rmFiles = files.filter((file) => {
    const entry = findByFile(status.files, file);
    return entry.status === 'deleted';
  });

  const addFiles = files.filter((file) => {
    const entry = findByFile(status.files, file);
    return entry.status !== 'deleted';
  });

  const command = [
    rmFiles.length ? `git rm ${rmFiles.join(' ')}` : '',
    addFiles.length ? `git add ${addFiles.join(' ')}` : '',
    `git commit -m "${message}"`,
  ].filter(line => !!line).join(' && ');

  gitCommand(repositoryId, command, false, () => {
    dispatch({
      type: GIT_COMMIT,
      repositoryId,
    });
    gitStatus(repositoryId)(dispatch, getState);
  })(dispatch, getState);
};
