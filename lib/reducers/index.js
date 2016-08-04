'use babel';

import { combineReducers } from 'redux';

import rightPanelWidth from './rightPanelWidth';
import workspaces from './workspaces';
import repositories from './repositories';
import selectedProjects from './selectedProjects';
import selectedDirectories from './selectedDirectories';
import selectedWorkspace from './selectedWorkspace';
import runningCommands from './runningCommands';
import finishedCommands from './finishedCommands';
import failedCommands from './failedCommands';
import collapsedSections from './collapsedSections';
import commitMessages from './commitMessages';

export default combineReducers({
  collapsedSections,
  rightPanelWidth,
  workspaces,
  repositories,
  selectedProjects,
  selectedDirectories,
  selectedWorkspace,
  runningCommands,
  finishedCommands,
  failedCommands,
  commitMessages,
});
