'use babel';

import gitCommand from './gitCommand';
import gitBranch from './gitBranch';
import gitPrune from './gitPrune';
import gitStatus from './gitStatus';
import { GIT_FETCH } from '../constants/actionTypes';

const parseHead = stdout => stdout.split('\n')
  .filter(line => line.indexOf('HEAD branch') !== -1)
  .pop()
  .split(':')
  .pop()
  .trim();

export default repository => dispatch => Promise.resolve()
  .then(() => {
    const command = 'git remote show origin';
    return dispatch(gitCommand(repository, command, false))
      .then(stdout => parseHead(stdout));
  })
  .then((head) => {
    const command = 'git fetch origin';
    return dispatch(gitCommand(repository, command, false))
      .then(() => {
        dispatch({
          type: GIT_FETCH,
          repositoryId: repository,
          head,
        });
      });
  })
  .then(() => dispatch(gitPrune(repository)))
  .then(() => dispatch(gitBranch(repository)))
  .then(() => dispatch(gitStatus(repository)));
