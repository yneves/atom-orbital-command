'use babel';

import lodash from 'lodash';
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

export default repositoryId => (dispatch, getState) => {
  const { repositories } = getState();
  const repository = lodash.find(repositories, repo => repo.id === repositoryId);
  const command = 'git status --porcelain -b';

  return dispatch(gitCommand(repositoryId, command, false, (stdout) => {
    dispatch({
      type: GIT_STATUS,
      repositoryId,
      status: parseStatus(stdout, repository.dir),
    });
  }))
  .then(() => dispatch(gitLog(repositoryId)));
};
