'use babel';

import R from 'ramda';
import path from 'path';
import {
  LOAD_WORKSPACES,
  TOGGLE_REPOSITORY,
} from '../constants/actionTypes';

const toggleState = (state, dir) => {
  const id = `repository:${dir}`;
  const propEq = R.propEq('id', id);
  const uniqBy = R.uniqBy(R.prop('id'));
  return R.find(propEq, state) ?
    uniqBy(R.reject(propEq, state)) :
    uniqBy(state.concat({
      id,
      dir,
      name: path.basename(dir),
    }));
};

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_WORKSPACES:
      return [];
    case TOGGLE_REPOSITORY:
      return toggleState(state, action.dir);
    default:
      return state;
  }
};
