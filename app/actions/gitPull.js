'use babel';

import gitStatus from './gitStatus';
import gitCommand from './gitCommand';
import { GIT_PULL } from '../constants/actionTypes';

export default repositoryId => (dispatch, getState) => {
  const { repositoryStatus } = getState();
  const status = repositoryStatus[repositoryId];
  const branch = status.local_branch;
  const command = `git pull origin ${branch}`;

  gitCommand(repositoryId, command, () => {
    dispatch({
      type: GIT_PULL,
      repositoryId,
      branch,
    });
    gitStatus(repositoryId)(dispatch, getState);
  })(dispatch, getState);
};
