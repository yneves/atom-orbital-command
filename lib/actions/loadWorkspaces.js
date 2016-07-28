'use babel';

import path from 'path';
import glob from 'glob';

import {
  LOAD_WORKSPACES
} from '../constants/actionTypes';

export default () => (dispatch) => {

  const pattern = atom.config.get('chloe.workspaces');
  if (!pattern) {
    return;
  }

  glob(pattern, {}, (error, files) => {
    const workspaces = files.map(loadWorkspace);
    dispatch({
      type: LOAD_WORKSPACES,
      workspaces,
    });
  });
};

const loadWorkspace = (file) => {

  const data = require(file);
  const dir = path.dirname(file);

  const projects = (data.projects || [])
    .map(project => {
      const projectDir = path.resolve(dir, project);
      return {
        id: project,
        name: path.basename(project),
        dir: projectDir
      };
    });

  const commands = (data.commands || [])
    .map(command => {
      return {
        id: command,
        command,
        dir
      };
    });

  return {
    id: file,
    dir,
    name: path.basename(file, '.chloe.js'),
    file,
    projects,
    commands
  };
};
