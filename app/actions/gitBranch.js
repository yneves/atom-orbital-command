'use babel';

import gitCommand from './gitCommand';
import { GIT_BRANCH } from '../constants/actionTypes';

const parseBranches = stdout => stdout.split('\n')
    .map(line => line.trim().replace(/^\*/, '').trim())
    .filter(line => /\w/.test(line));

export default repositoryId => (dispatch, getState) => {
  const command = 'git branch --list';
  gitCommand(repositoryId, command, false, (stdout) => {
    const branches = parseBranches(stdout);
    dispatch({
      type: GIT_BRANCH,
      repositoryId,
      branches,
    });
  })(dispatch, getState);
};
