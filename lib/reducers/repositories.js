'use babel';

import R from 'ramda';
import path from 'path';
import {
  TOGGLE_REPOSITORY,
  LOAD_REPOSITORY,
  LOAD_WORKSPACES,
  TOGGLE_REPOSITORY_FILE,
} from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_WORKSPACES:
      return [];
    case LOAD_REPOSITORY:
      return mergeState(state, action.id, action.data);
    case TOGGLE_REPOSITORY:
      return toggleState(state, action.dir);
    case TOGGLE_REPOSITORY_FILE:
      return toggleFile(state, action.id, action.file);
    default:
      return state;
  }
};

const toggleFile = (state, id, file) => {
  const propId = R.propEq('id', id);
  const repository = R.find(propId, state);
  const propFile = R.propEq('file', file);
  const fileEntry = R.find(propFile, repository.files);
  fileEntry.commit = !fileEntry.commit;
  return mergeState(state, id, {
    files: repository.files
  });
};

const mergeState = (state, id, data) => {
  const propEq = R.propEq('id', id);
  const repository = R.find(propEq, state)
  const index = R.indexOf(repository, state);
  return R.update(index, {...repository, ...data}, state);
};

const toggleState = (state, dir) => {
  const id = 'repository:' + dir;
  const propEq = R.propEq('id', id);
  const uniqBy = R.uniqBy(R.prop('id'));
  return R.find(propEq, state) ?
    uniqBy(R.reject(propEq, state)) :
    uniqBy(state.concat({
      id,
      dir,
      name: path.basename(dir),
      branch: '',
      files: [],
    }));
};
