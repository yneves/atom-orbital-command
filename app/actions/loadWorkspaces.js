'use babel';

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

  return {
    ...workspace,
    ...data.workspace,
    projects,
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
