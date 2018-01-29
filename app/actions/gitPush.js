'use babel';

import gitStatus from './gitStatus';
import gitCommand from './gitCommand';

import { GIT_PUSH } from '../constants/actionTypes';

export default (repository, branch, commit) => (dispatch, getState) => {
  const { repositoryStatus } = getState();
  const status = repositoryStatus[repository];

  const remote = status && status.remote_branch ? status.remote_branch.split('/').shift() : 'origin';
  const push = commit ? `${commit}:${branch}` : branch;
  const command = `git push ${remote} ${push}`;

  return dispatch(gitCommand(repository, command, true))
    .then(() => {
      dispatch({
        type: GIT_PUSH,
        repository,
        branch,
      });
      return dispatch(gitStatus(repository));
    });
};
