'use babel';

import lodash from 'lodash';
import gitStatus from './gitStatus';

export default file => (dispatch, getState) => {
  const filepath = lodash.isString(file) ? file : file.path;
  const { repositories } = getState();
  lodash.forEach(repositories, (repository) => {
    if (filepath.startsWith(repository.dir)) {
      gitStatus(repository.id)(dispatch, getState);
    }
  });
};
