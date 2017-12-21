'use babel';

import gitCommand from './gitCommand';
import { GIT_PRUNE } from '../constants/actionTypes';

export default repositoryId => dispatch => Promise.resolve()
  .then(() => dispatch(gitCommand(repositoryId, 'git prune', false)))
  .then(() => dispatch(gitCommand(repositoryId, 'git remote prune origin', false)))
  .then(() => {
    dispatch({
      type: GIT_PRUNE,
      repositoryId,
    });
  });
