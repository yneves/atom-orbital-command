'use babel';

import gitStatus from './gitStatus';
import gitCommand from './gitCommand';

import { GIT_PUSH } from '../constants/actionTypes';

export default (repositoryId, branch, commit) => (dispatch, getState) => {
  const { repositoryStatus } = getState();
  const status = repositoryStatus[repositoryId];

  const remote = status.remote_branch ? status.remote_branch.split('/').shift() : 'origin';
  const pushBranch = (branch || status.remote_branch || status.local_branch)
    .replace(`${remote}/`, '');
  const push = commit ? `${commit}:${pushBranch}` : pushBranch;
  const command = `git push ${remote} ${push}`;

  gitCommand(repositoryId, command, true, () => {
    dispatch({
      type: GIT_PUSH,
      repositoryId,
      pushBranch,
    });
    gitStatus(repositoryId)(dispatch, getState);
  })(dispatch, getState);
};
