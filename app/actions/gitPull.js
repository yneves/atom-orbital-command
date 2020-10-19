'use babel';

import { remote } from 'electron';
import gitStatus from './gitStatus';
import gitCommand from './gitCommand';
import { GIT_PULL } from '../constants/actionTypes';

export default (repository, branch) => (dispatch, getState) => {
  const { repositoryStatus } = getState();
  const status = repositoryStatus[repository];
  const localBranch = status.local_branch;
  const remoteBranch = branch || localBranch;
  const command = `git pull origin ${remoteBranch}`;

  const confirmPull = () => {
    if (remoteBranch === localBranch) {
      return Promise.resolve(true);
    }
    return remote.dialog.showMessageBox({
      type: 'question',
      title: 'git checkout',
      message: `Pull "${branch}" into "${localBranch}"?`,
      buttons: ['Pull', 'Cancel'],
      defaultId: 0,
      cancelId: 1,
    }).then(data => data.response === 0);
  };

  return confirmPull().then((confirmed) => {
    if (!confirmed) {
      return Promise.resolve();
    }

    return dispatch(gitCommand(repository, command, true, () => {
      dispatch({
        type: GIT_PULL,
        repository,
        branch,
      });
      return dispatch(gitStatus(repository));
    }));
  });
};
