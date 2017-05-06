'use babel';

import R from 'ramda';
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
  if (R.is(Array, command)) {
    command = R.join(' && ', command);
  }
  if (R.is(String, command)) {
    command = {
      command,
      label: command,
    };
  }
  if (!command.command && R.is(String, command.source)) {
    command.command = `node ${command.source}`;
  }
  if (R.is(Array, command.command)) {
    command.command = R.join(' && ', command.command);
  }
  return R.merge(command, {
    id: uid(),
    dir,
    env: R.merge(data.env || {}, command.env || {}),
  });
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
