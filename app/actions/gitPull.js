'use babel';

import { remote } from 'electron';
import gitStatus from './gitStatus';
import gitCommand from './gitCommand';
import { GIT_PULL } from '../constants/actionTypes';

export default (repository, branch) => (dispatch, getState) => {
  const { repositoryStatus } = getState();
  const status = repositoryStatus[repository];
  const localBranch = status.local_branch;

  const confirmPull = () => {
    const button = remote.dialog.showMessageBox({
      type: 'question',
      title: 'git checkout',
      message: `Pull "${branch}" into "${localBranch}"?`,
      buttons: ['Pull', 'Cancel'],
      defaultId: 0,
      cancelId: 1,
    });
    return (button === 0);
  };

  const remoteBranch = branch || localBranch;
  if (remoteBranch !== localBranch && !confirmPull()) {
    return Promise.resolve();
  }

  const command = `git pull origin ${remoteBranch}`;

  return dispatch(gitCommand(repository, command, true, () => {
    dispatch({
      type: GIT_PULL,
      repository,
      branch,
    });
    return dispatch(gitStatus(repository));
  }));
};
