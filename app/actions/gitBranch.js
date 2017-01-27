'use babel';

import R from 'ramda';
import gitCommand from './gitCommand';
import { GIT_BRANCH } from '../constants/actionTypes';

const parseBranches = (stdout) => {
  const lines = stdout.split('\n')
    .map(line => line.trim().replace(/^\*/, '').trim());
  return R.reject(R.isEmpty, lines);
};

export default repositoryId => (dispatch, getState) => {
  const command = 'git branch --list';
  gitCommand(repositoryId, command, false, (stdout) => {
    dispatch({
      type: GIT_BRANCH,
      repositoryId,
      branches: parseBranches(stdout),
    });
  })(dispatch, getState);
};
