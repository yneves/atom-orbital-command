'use babel';

import R from 'ramda';
import cp from 'child_process';
import { GIT_BRANCH } from '../constants/actionTypes';

const parseBranches = (stdout) => {
  const lines = stdout.split('\n')
    .map(line => line.trim().replace(/^\*/, '').trim());
  return R.reject(R.isEmpty, lines);
};

export default repositoryId => (dispatch, getState) => {
  const { repositories } = getState();
  const repository = R.find(R.propEq('id', repositoryId), repositories);

  const command = R.join(' && ', [
    `cd ${repository.dir}`,
    'git branch --list',
  ]);

  cp.exec(command, {}, (error, stdout) => {
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
