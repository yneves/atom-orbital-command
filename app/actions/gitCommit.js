'use babel';

import lodash from 'lodash';
import gitCommand from './gitCommand';
import gitStatus from './gitStatus';
import { GIT_COMMIT } from '../constants/actionTypes';

const findByFile = (list, file) => lodash.find(list, item => item.file === file);

export default repository => (dispatch, getState) => {
  const { repositoryStatus, commitMessages, commitFiles } = getState();
  const message = commitMessages[repository];
  const status = repositoryStatus[repository];
  const files = lodash.keys(commitFiles[repository])
    .filter(file => !!commitFiles[repository][file]);

  const stageCommands = files.map((file) => {
    const entry = findByFile(status.files, file);
    if (entry.status === 'deleted') {
      return `git rm ${file}`;
    }
    return `git add ${file}`;
  });

  return dispatch(gitCommand(repository, stageCommands, false))
    .then(() => {
      const commitCommand = `git commit -m "${message}"`;
      return dispatch(gitCommand(repository, commitCommand, false, () => {
        dispatch({
          type: GIT_COMMIT,
          repositoryId: repository,
        });
      }));
    })
    .then(() => dispatch(gitStatus(repository)));
};
