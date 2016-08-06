'use babel';

import R from 'ramda';
import cp from 'child_process';
import { GIT_CHECKOUT } from '../constants/actionTypes';
import gitStatus from './gitStatus';

export default (repositoryId, branch) => (dispatch, getState) => {

  const { repositories } = getState();
  const repository = R.find(R.propEq('id', repositoryId), repositories);

  const command = R.join(' && ', [
    'cd ' + repository.dir,
    'git checkout ' + branch,
  ]);

  cp.exec(command, {}, (error, stdout, stderr) => {
    if (!error) {
      dispatch({
        type: GIT_CHECKOUT,
        repositoryId,
        branch
      });
      gitStatus(repositoryId)(dispatch, getState);
    }
  });

};
