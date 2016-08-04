'use babel';

import R from 'ramda';
import cp from 'child_process';
import {
  GIT_COMMIT
} from '../constants/actionTypes';

export default (repositoryId, message) => (dispatch, getState) => {

  const {repositories} = getState();
  const findById = R.find(R.propEq('id', repositoryId));

  const repository = findById(repositories);

  const isIncluded = R.propEq('commit', true);
  const isDeleted = R.propEq('status', 'deleted');
  const pluckFile = R.pluck('file');
  const files = R.filter(isIncluded, repository.files);
  const rmFiles = pluckFile(R.filter(isDeleted, files));
  const addFiles = pluckFile(R.reject(isDeleted, files));

  const command = R.join(' && ', R.reject(R.isEmpty, [
    'cd ' + repository.dir,
    rmFiles.length ? 'git rm ' +  rmFiles.join(' ') : '',
    addFiles.length ? 'git add ' + addFiles.join(' ') : '',
    'git commit -m "' + message + '"',
    'git push origin ' + repository.branch
  ]));

  cp.exec(command, {}, (error, stdout, stderr) => {
    console.log(error, stdout, stderr);
  });

  return {
    type: GIT_COMMIT,
  };
};
