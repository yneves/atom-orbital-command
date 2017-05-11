'use babel';

import R from 'ramda';
import lodash from 'lodash';
import uid from 'uid';
import path from 'path';
import glob from 'glob';
import showNotification from './showNotification';

import {
  LOAD_WORKSPACES,
} from '../constants/actionTypes';

const tryRequire = (file) => {
  delete require.cache[file];
  /* eslint global-require: 0 */
  /* eslint import/no-dynamic-require: 0 */
  return require(file);
};

const loadCommand = (dir, data) => (raw) => {
  let command = raw;
  if (lodash.isString(command)) {
    command = {
      command,
      label: command,
    };
  }
  if (!command.command && lodash.isString(command.source)) {
    command.command = `node ${command.source}`;
  }
  if (!command.label) {
    command.label = command.command;
  }
  return {
    id: uid(),
    ...command,
    cwd: path.resolve(dir, command.cwd || '.'),
    env: {
      ...data.env,
      ...command.env,
    },
  };
};

const loadProject = (dir, data) => (project) => {
  const projectDir = path.resolve(dir, project);
  return {
    id: project,
    env: (data.workspace && data.workspace.env) || {},
    name: path.basename(project),
    dir: projectDir,
    commands: [],
  };
};

const getWorkspace = file => ({
  id: uid(),
  name: path.basename(file),
  dir: path.dirname(file),
  file,
});

const loadWorkspace = (file) => {
  const workspace = getWorkspace(file);
  const data = tryRequire(require.resolve(file));
  const dir = path.dirname(file);
  const projects = ((data && data.projects) || []).map(loadProject(dir, data));
  const commands = ((data && data.commands) || []).map(loadCommand(dir, data));

  return {
    ...workspace,
    ...data.workspace,
    projects,
    commands,
  };
};

export default () => (dispatch, getState) => {
  const { config: { workspacesGlobPattern } } = getState();
  if (!workspacesGlobPattern) {
    return;
  }
  glob(workspacesGlobPattern, {}, (error, files) => {
    const workspaces = [];
    files.forEach((file) => {
      try {
        workspaces.push(loadWorkspace(file));
      } catch (e) {
        dispatch(showNotification({
          type: 'error',
          message: `Failed to load workspace: ${file}`,
          detail: e,
        }));
        workspaces.push(getWorkspace(file));
      }
    });
    dispatch({
      type: LOAD_WORKSPACES,
      workspaces,
    });
  });
};
