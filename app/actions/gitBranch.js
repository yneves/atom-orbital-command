'use babel';

import R from 'ramda';
import cp from 'child_process';
import { GIT_BRANCH } from '../constants/actionTypes';

export default (repositoryId) => (dispatch, getState) => {

  const {repositories} = getState();
  const repository = R.find(R.propEq('id', repositoryId), repositories);

  const command = R.join(' && ', [
    'cd ' + repository.dir,
    'git branch --list',
  ]);

  cp.exec(command, {}, (error, stdout, stderr) => {
    if (!error) {
      const branches = parseBranches(stdout);
      dispatch({
        type: GIT_BRANCH,
        repositoryId,
        branches,
      });
    }
  });
};

const parseBranches = (stdout) => {
  return R.reject(R.isEmpty, stdout.split('\n').map(line => {
    return line.trim().replace(/^\*/, '').trim();
  }));
};
