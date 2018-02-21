'use babel';

import lodash from 'lodash';
import { remote } from 'electron';
import gitPush from './gitPush';
// import gitFetch from './gitFetch';
import gitStatus from './gitStatus';
import gitCommand from './gitCommand';
import showNotification from './showNotification';
import { GIT_CHECKOUT } from '../constants/actionTypes';

export default (repository, branch, file) => (dispatch, getState) => {
  const branchExists = () => {
    const { repositoryBranch } = getState();
    const branches = repositoryBranch[repository];
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
    .then(() => dispatch(gitCommand(repository, `git checkout ${branch} ${file || ''}`, true))
      .catch((error) => {
        console.log(error);
        if (!branchExists() && file) {
          showNotification({
            message: 'Cannot checkout file from nonexistent branch',
            type: 'error',
            detail: file,
          });
          return;
        }
        if (confirmCreate()) {
          const command = `git checkout -b ${branch}`;
          return dispatch(gitCommand(repository, command, true))
            .then(() => dispatch(gitPush(repository, branch)));
        }
      })
      .then(() => dispatch(gitStatus(repository))))
    .then(() => {
      dispatch({
        type: GIT_CHECKOUT,
        repository,
        branch,
        file,
      });
    });
};
