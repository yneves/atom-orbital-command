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

  const stageCommands = files.map((file) => {
    const entry = findByFile(status.files, file);
    if (entry.status === 'deleted') {
      return `git rm ${file}`;
    }
    return `git add ${file}`;
  });

  return dispatch(gitCommand(repositoryId, stageCommands, false))
    .then(() => {
      const commitCommand = `git commit -m "${message}"`;
      return dispatch(gitCommand(repositoryId, commitCommand, false, () => {
        dispatch({
          type: GIT_COMMIT,
          repositoryId,
        });
      }));
    })
    .then(() => dispatch(gitStatus(repositoryId)));
};
