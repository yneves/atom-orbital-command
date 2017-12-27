'use babel';

import lodash from 'lodash';
import { remote } from 'electron';
import gitPush from './gitPush';
// import gitFetch from './gitFetch';
import gitStatus from './gitStatus';
import gitCommand from './gitCommand';
import showNotification from './showNotification';
import { GIT_CHECKOUT } from '../constants/actionTypes';

export default (repositoryId, branch, file) => (dispatch, getState) => {
  const branchExists = () => {
    const { repositoryBranch } = getState();
    const branches = repositoryBranch[repositoryId];
    return lodash.includes(branches, branch);
  };

  const confirmCreate = () => {
    const button = remote.dialog.showMessageBox({
      type: 'question',
      title: 'git checkout',
      message: `The branch ${branch} does not exists, create?`,
      buttons: ['Create', 'Cancel'],
      defaultId: 0,
      cancelId: 1,
    });
    return (button === 0);
  };

  return Promise.resolve()
    // .then(() => {
    //   if (!branchExists()) {
    //     return dispatch(gitFetch(repositoryId));
    //   }
    // })
    .then(() => {
      if (!branchExists() && file) {
        showNotification({
          message: 'Cannot checkout file from nonexistent branch',
          type: 'error',
          detail: file,
        });
        return;
      }
      if (branchExists()) {
        const command = `git checkout ${branch} ${file || ''}`;
        return dispatch(gitCommand(repositoryId, command, true))
          .then(() => dispatch(gitStatus(repositoryId)));
      }
      if (confirmCreate()) {
        const command = `git checkout -b ${branch}`;
        return dispatch(gitCommand(repositoryId, command, true))
          .then(() => dispatch(gitPush(repositoryId, branch)));
      }
    })
    .then(() => {
      dispatch({
        type: GIT_CHECKOUT,
        repositoryId,
        branch,
        file,
      });
    });
};
