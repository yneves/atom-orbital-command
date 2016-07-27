'use babel';

import { combineReducers } from 'redux';

import workspaces from './workspaces';
import selectedProjects from './selectedProjects';
import selectedDirectories from './selectedDirectories';
import selectedWorkspace from './selectedWorkspace';
import runningCommands from './runningCommands';
import finishedCommands from './finishedCommands';
import failedCommands from './failedCommands';

export default combineReducers({
  workspaces,
  selectedProjects,
  selectedDirectories,
  selectedWorkspace,
  runningCommands,
  finishedCommands,
  failedCommands,
});
