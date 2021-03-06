'use babel';

import gitCommand from './gitCommand';
import { GIT_LOG } from '../constants/actionTypes';


const parseLog = (stdout) => {
  const commits = stdout.split(/\n/)
    .filter(line => line.indexOf('commit') === 0)
    .map(line => line.trim().substr(7))
    .map(commit => ({ commit }));
  return commits;
};

export default repository => (dispatch, getState) => {
  const { repositoryStatus } = getState();
  const status = repositoryStatus[repository];
  const local = status.local_branch;
  const remote = status.remote_branch;
  const branch = remote || `origin/${local}`;
  const command = `git log ${branch}...HEAD`;

  gitCommand(repository, command, false, (stdout) => {
    dispatch({
      type: GIT_LOG,
      repository,
      log: parseLog(stdout),
    });
  })(dispatch, getState);
};
