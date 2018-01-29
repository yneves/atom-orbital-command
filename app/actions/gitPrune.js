'use babel';

import gitCommand from './gitCommand';
import { GIT_PRUNE } from '../constants/actionTypes';

export default repository => dispatch => Promise.resolve()
  .then(() => dispatch(gitCommand(repository, 'git prune', false)))
  .then(() => dispatch(gitCommand(repository, 'git remote prune origin', false)))
  .then(() => {
    dispatch({
      type: GIT_PRUNE,
      repository,
    });
  });
