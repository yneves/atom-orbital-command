'use babel';

import R from 'ramda';
import path from 'path';
import {
  TOGGLE_REPOSITORY,
  LOAD_REPOSITORY,
  LOAD_WORKSPACES,
} from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_WORKSPACES:
      return [];
    case LOAD_REPOSITORY:
      return mergeState(state, action.id, action.data);
    case TOGGLE_REPOSITORY:
      return toggleState(state, action.dir);
    default:
      return state;
  }
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
