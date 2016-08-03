'use babel';

import R from 'ramda';
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

const tryRequire = (file) => {
  try {
    delete require.cache[file];
    const data = require(file);
    return data;
  } catch(e) {
    console.error(e);
    return null;
  }
}

const getProjectCommands = (dir, project) => {
  const file = path.resolve(dir, project, 'package.json');
  const pkg = tryRequire(file);
  if (!pkg || !pkg.scripts) {
    return [];
  }
  return R.keys(pkg.scripts)
    .map(script => `cd ${project} && npm run ${script}`);
};

const loadProject = (dir) => (project) => {
  const projectDir = path.resolve(dir, project);
  const commands = getProjectCommands(dir, project).map(loadCommand(dir));

  return {
    id: project,
    name: path.basename(project),
    dir: projectDir,
    commands,
  };
};

const loadCommand = (dir) => (command) => {
  return {
    id: command,
    command,
    dir
  };
};

const loadWorkspace = (file) => {

  const data = tryRequire(require.resolve(file));
  const dir = path.dirname(file);
  const projects = ((data && data.projects) || []).map(loadProject(dir));
  const commands = ((data && data.commands) || []).map(loadCommand(dir));

  return {
    id: file,
    dir,
    failed: data === null,
    name: path.basename(file, '.chloe.js'),
    file,
    projects,
    commands
  };
};
