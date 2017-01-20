'use babel';

import R from 'ramda';
import cp from 'child_process';
import path from 'path';
import gitGetStatus from 'git-get-status';
import gitLog from './gitLog';

import {
  GIT_STATUS,
  GIT_PROGRESS,
} from '../constants/actionTypes';

export default repositoryId => (dispatch, getState) => {
  const findById = R.find(R.propEq('id', repositoryId));
  const repository = findById(getState().repositories);
  const command = 'git status --porcelain -b';
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
        type: GIT_STATUS,
        repositoryId,
        status: parseStatus(stdout, repository.dir),
      });
      console.log('gitLog');
      gitLog(repositoryId)(dispatch, getState);
    }
  });
};

const parseStatus = (stdout, dir) => {
  const status = gitGetStatus.parse_status(stdout);
  status.files = status.files.map(file => ({
    file: file.substr(3).trim(),
    path: path.resolve(dir, file.substr(3).trim()),
    status: {
      D: 'deleted',
      M: 'modified',
      '??': 'new',
    }[file.substr(0, 3).trim()],
  }));
  return status;
};
