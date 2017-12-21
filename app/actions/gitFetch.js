'use babel';

import gitCommand from './gitCommand';
import gitBranch from './gitBranch';
import { GET_FETCH } from '../constants/actionTypes';

export default repositoryId => (dispatch) => {
  const command = 'git fetch origin';

  return dispatch(gitCommand(repositoryId, command, true, () => {
    dispatch({
      type: GET_FETCH,
      repositoryId,
    });
  }))
  .then(() => dispatch(gitBranch(repositoryId)));
};
