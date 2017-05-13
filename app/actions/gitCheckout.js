'use babel';

import loodash from 'lodash';
import { remote } from 'electron';
import gitPush from './gitPush';
import gitStatus from './gitStatus';
import gitCommand from './gitCommand';
import showNotification from './showNotification';
import { GIT_CHECKOUT } from '../constants/actionTypes';

export default (repositoryId, branch, file) => (dispatch, getState) => {
  const { repositoryBranch } = getState();
  const branches = repositoryBranch[repositoryId];
  const branchExists = lodash.includes(branches, branch);

  if (!branchExists && file) {
    showNotification({
      message: 'Cannot checkout file from nonexistent branch',
      type: 'error',
      detail: file,
    });
    return;
  }

  let create = '';
  if (!branchExists) {
    const button = remote.dialog.showMessageBox({
      type: 'question',
      title: 'git checkout',
      message: `The branch ${branch} does not exists, create?`,
      buttons: ['Create', 'Cancel'],
      defaultId: 0,
      cancelId: 1,
    });
    if (button === 0) {
      create = '-b';
    }
  }

  const command = `git checkout ${create} ${branch} ${file || ''}`;

  gitCommand(repositoryId, command, true, () => {
    dispatch({
      type: GIT_CHECKOUT,
      repositoryId,
      branch,
      file,
    });
    if (create) {
      gitPush(repositoryId, branch)(dispatch, getState);
    } else {
      gitStatus(repositoryId)(dispatch, getState);
    }
  })(dispatch, getState);
};
