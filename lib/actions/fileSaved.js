'use babel';

import R from 'ramda';
import gitStatus from './gitStatus';

export default (event) => (dispatch, getState) => {

  const {repositories} = getState();
  R.keys(repositories).forEach((repositoryId) => {
    const repository = repositories[repositoryId];
    if (event.path.startsWith(repository.dir)) {
      gitStatus(repository.id)(dispatch, getState);
    }
  });
};
