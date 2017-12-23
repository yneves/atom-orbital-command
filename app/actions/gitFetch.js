'use babel';

import gitCommand from './gitCommand';
import gitBranch from './gitBranch';
// import gitPrune from './gitPrune';
import gitPull from './gitPull';
import { GET_FETCH } from '../constants/actionTypes';

export default (repositoryId, branch) => (dispatch) => {
  const command = 'git fetch origin';

  return dispatch(gitCommand(repositoryId, command, false))
    .then(() => {
      dispatch({
        type: GET_FETCH,
        repositoryId,
      });
    })
    .then(() => dispatch(gitBranch(repositoryId)))
    .then(() => {
      if (branch) {
        return dispatch(gitPull(repositoryId, branch));
      }
    });
};
