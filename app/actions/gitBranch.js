'use babel';

import gitCommand from './gitCommand';
import { GIT_BRANCH } from '../constants/actionTypes';

const parseBranches = stdout => stdout.split('\n')
  .map(line => line.trim().replace(/^\*/, '').trim())
  .filter(line => /\w/.test(line));

export default repository => (dispatch) => {
  const command = 'git branch --list';
  return dispatch(gitCommand(repository, command, false, (stdout) => {
    const branches = parseBranches(stdout);
    dispatch({
      type: GIT_BRANCH,
      repository,
      branches,
    });
  }));
};
