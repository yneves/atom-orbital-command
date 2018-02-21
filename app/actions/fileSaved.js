'use babel';

import lodash from 'lodash';
import gitStatus from './gitStatus';

export default file => (dispatch, getState) => {
  const filepath = lodash.isString(file) ? file : file.path;
  const { openRepositories } = getState();
  lodash.forEach(openRepositories, (repository) => {
    if (filepath.startsWith(repository)) {
      gitStatus(repository)(dispatch, getState);
    }
  });
};
