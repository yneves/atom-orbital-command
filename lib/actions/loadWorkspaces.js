'use babel';

import path from 'path';

import {
  LOAD_WORKSPACES
} from '../constants/actionTypes';

export default () => {

  const files = [
    '/Users/yneves1/code/work/chesscom/chesscom.chloe.js',
    '/Users/yneves1/code/work/syncids/syncids.chloe.js',
  ];
  const workspaces = files.map((file) => {

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
  });

  return {
    type: LOAD_WORKSPACES,
    workspaces,
  };
};
