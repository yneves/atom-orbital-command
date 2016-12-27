'use babel';

import R from 'ramda';
import uid from 'uid';
import fs from 'fs';
import path from 'path';
import glob from 'glob';

import {
  LOAD_WORKSPACES
} from '../constants/actionTypes';

export default () => (dispatch, getState) => {

  const {config: {workspacesPattern}} = getState();
  if (!workspacesPattern) {
    return;
  }

  glob(workspacesPattern, {}, (error, files) => {
    const workspaces = files.map(loadWorkspace);
    dispatch({
      type: LOAD_WORKSPACES,
      workspaces,
    });
  });
};

const tryRequire = (file) => {
  try {
    if (fs.existsSync(file)) {
      delete require.cache[file];
      const data = require(file);
      return data;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

const getProjectCommands = (dir, project) => {
  const file = path.resolve(dir, project, 'package.json');
  const pkg = tryRequire(file);
  if (!pkg || !pkg.scripts) {
    return [];
  }
  return R.keys(pkg.scripts)
    .map(script => `cd ${project} && npm run ${script}`);
};

const loadProject = (dir, data) => (project) => {
  const projectDir = path.resolve(dir, project);
  const commands = getProjectCommands(dir, project).map(loadCommand(dir, data));

  return {
    id: project,
    env: data.workspace && data.workspace.env || {},
    name: path.basename(project),
    dir: projectDir,
    commands,
  };
};

const loadCommand = (dir, data) => (command) => {
  if (R.is(Array, command)) {
    command = R.join(' && ', command);
  }
  if (R.is(String, command)) {
    command = {
      command,
      label: command
    };
  }
  if (R.is(Array, command.command)) {
    command.command = R.join(' && ', command.command);
  }
  return R.merge(command, {
    id: uid(),
    dir,
    env: R.merge(data.env || {}, command.env || {})
  });
};

const loadBookmark = (dir, data) => (url) => {
  if (R.is(String, url)) {
    url = {
      url,
      label: url
    };
  }
  return R.merge(url, {
    id: uid(),
  });
};

const loadWorkspace = (file) => {

  const data = tryRequire(require.resolve(file));
  const dir = path.dirname(file);

  const projects = ((data && data.projects) || [])
    .map(loadProject(dir, data));

  const commands = ((data && data.commands) || [])
    .map(loadCommand(dir, data));

  const bookmarks = ((data && data.bookmarks) || [])
    .map(loadBookmark(dir, data));

  return R.merge(data && data.workspace || {}, {
    id: uid(),
    dir,
    failed: data === null,
    name: path.basename(file),
    file,
    projects,
    commands,
    bookmarks
  });
};
