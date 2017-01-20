'use babel';

import R from 'ramda';
import cp from 'child_process';
import { remote } from 'electron';
import gitPush from './gitPush';
import gitStatus from './gitStatus';
import showNotification from './showNotification';
import {
  GIT_CHECKOUT,
  GIT_PROGRESS,
} from '../constants/actionTypes';

export default (repositoryId, branch, file) => (dispatch, getState) => {
  const { repositories, repositoryBranch } = getState();
  const branches = repositoryBranch[repositoryId];
  const repository = R.find(R.propEq('id', repositoryId), repositories);
  const branchExists = R.contains(branch, branches);

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
  const opts = { cwd: repository.dir };

  dispatch({
    type: GIT_PROGRESS,
    repositoryId,
    command,
  });

  cp.exec(command, opts, (error, stdout, stderr) => {
    showNotification({
      message: error ? 'Checkout failed' :
        create ? 'Branch created' : 'Branch changed',
      type: error ? 'error' : 'success',
      detail: error ? error.message || stderr : stdout,
    });
    if (!error) {
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
    }
  });
};
