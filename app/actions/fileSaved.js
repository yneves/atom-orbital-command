'use babel';

import R from 'ramda';
import gitStatus from './gitStatus';

export default file => (dispatch, getState) => {
  const filepath = R.is(String, file) ? file : file.path;
  const { repositories } = getState();
  R.keys(repositories).forEach((repositoryId) => {
    const repository = repositories[repositoryId];
    if (filepath.startsWith(repository.dir)) {
      gitStatus(repository.id)(dispatch, getState);
    }
  });
};
