'use babel';

import R from 'ramda';
import cp from 'child_process';
import { GIT_COMMIT } from '../constants/actionTypes';
import showNotification from './showNotification';

export default (repositoryId, message) => (dispatch, getState) => {

  const findById = R.find(R.propEq('id', repositoryId));
  const repository = findById(getState().repositories);
  const isIncluded = R.propEq('commit', true);
  const isDeleted = R.propEq('status', 'deleted');
  const pluckFile = R.pluck('file');
  const files = R.filter(isIncluded, repository.files);
  const rmFiles = pluckFile(R.filter(isDeleted, files));
  const addFiles = pluckFile(R.reject(isDeleted, files));

  const command = R.join(' && ', R.reject(R.isEmpty, [
    'cd ' + repository.dir,
    rmFiles.length ? 'git rm ' + rmFiles.join(' ') : '',
    addFiles.length ? 'git add ' + addFiles.join(' ') : '',
    'git commit -m "' + message + '"',
    'git push origin ' + repository.branch
  ]));

  cp.exec(command, {}, (error, stdout, stderr) => {
    showNotification({
      message: error ? 'Commit failed' : 'Commit done',
      type: error ? 'error' : 'success',
      detail: error ? error.message || stderr : stdout
    });
  });

  return {
    type: GIT_COMMIT,
  };
};
