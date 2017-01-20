'use babel';

import R from 'ramda';
import cp from 'child_process';
import path from 'path';

import {
  GIT_LOG,
  GIT_PROGRESS,
} from '../constants/actionTypes';

export default repositoryId => (dispatch, getState) => {
  const { repositories, repositoryStatus } = getState();
  const status = repositoryStatus[repositoryId];
  const local = status.local_branch;
  const remote = status.remote_branch;
  const branch = remote || `origin/${local}`;
  const repository = R.find(R.propEq('id', repositoryId), repositories);
  const command = `git log ${branch}...HEAD`;
  const opts = { cwd: repository.dir };

  dispatch({
    type: GIT_PROGRESS,
    repositoryId,
    command,
  });

  cp.exec(command, opts, (error, stdout, stderr) => {
    if (error) {
      console.error(error, stderr);
    } else {
      dispatch({
        type: GIT_LOG,
        repositoryId,
        log: parseLog(stdout),
      });
    }
  });
};

const parseLog = (stdout) => {
  const commits = stdout.split(/\n/)
    .filter(line => line.indexOf('commit') === 0)
    .map(line => line.trim().substr(7))
    .map(commit => ({ commit }));
  return commits;
};
