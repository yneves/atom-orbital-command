'use babel';

import path from 'path';
import gitGetStatus from 'git-get-status';
import gitCommand from './gitCommand';
import gitLog from './gitLog';
import { GIT_STATUS } from '../constants/actionTypes';

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

export default repository => (dispatch) => {
  const command = 'git status --porcelain -b';

  return dispatch(gitCommand(repository, command, false, (stdout) => {
    dispatch({
      type: GIT_STATUS,
      repository,
      status: parseStatus(stdout, repository),
    });
  }))
    .then(() => dispatch(gitLog(repository)));
};
