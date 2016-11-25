'use babel';

import R from 'ramda';
import cp from 'child_process';
import { remote } from 'electron';
import gitStatus from './gitStatus';
import showNotification from './showNotification';
import {
  GIT_CHECKOUT,
  GIT_PROGRESS,
} from '../constants/actionTypes';

export default (repositoryId, branch, file) => (dispatch, getState) => {

  const {repositories, repositoryBranch} = getState();
  const branches = repositoryBranch[repositoryId];
  const repository = R.find(R.propEq('id', repositoryId), repositories);

  let create = '';
  if (!R.contains(branch, branches)) {
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

  const gitCommand = `git checkout ${create} ${branch} ${file || ''}`;
  const command = R.join(' && ', R.reject(R.isEmpty, [
    'cd ' + repository.dir,
    gitCommand
  ]));

  dispatch({
    type: GIT_PROGRESS,
    repositoryId,
    command: gitCommand,
  });

  cp.exec(command, {}, (error, stdout, stderr) => {
    showNotification({
      message: error ? 'Checkout failed' :
        create ? 'Branch created' : 'Branch changed',
      type: error ? 'error' : 'success',
      detail: error ? error.message || stderr : stdout
    });
    if (!error) {
      dispatch({
        type: GIT_CHECKOUT,
        repositoryId,
        branch,
        file
      });
      gitStatus(repositoryId)(dispatch, getState);
    }
  });

};
