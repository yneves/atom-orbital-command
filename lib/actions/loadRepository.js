'use babel';

import R from 'ramda';
import {Directory} from 'atom';

import {
  LOAD_REPOSITORY
} from '../constants/actionTypes';

export default (id) => (dispatch, getState) => {

  const {repositories} = getState();
  const repository = R.find(R.propEq('id', id), repositories);

  const directory = new Directory(repository.dir);
  atom.project.repositoryForDirectory(directory)
    .then((gitRepository) => {
      dispatch({
        type: LOAD_REPOSITORY,
        id,
        data: readRepository(gitRepository)
      });
    });
};

const readRepository = (gitRepository) => {
  return {
    branch: gitRepository.branch.replace(/^refs\/heads\//, ''),
    files: readFiles(gitRepository.statuses)
  };
};

const readFiles = (files) => {
  return R.keys(files)
    .map(key => {
      const value = files[key];
      return {
        file: key,
        commit: true,
        status: {
          128: 'new',
          256: 'modified'
        }[value]
      };
    });
};
