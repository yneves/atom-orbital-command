'use babel';

import { combineReducers } from 'redux';

import checkoutBranch from './checkoutBranch';
import collapsedSections from './collapsedSections';
import commitFiles from './commitFiles';
import commitMessages from './commitMessages';
import failedCommands from './failedCommands';
import finishedCommands from './finishedCommands';
import repositories from './repositories';
import repositoryStatus from './repositoryStatus';
import rightPanelWidth from './rightPanelWidth';
import runningCommands from './runningCommands';
import selectedDirectories from './selectedDirectories';
import selectedProjects from './selectedProjects';
import selectedWorkspace from './selectedWorkspace';
import workspaces from './workspaces';

export default combineReducers({
  checkoutBranch,
  collapsedSections,
  commitFiles,
  commitMessages,
  failedCommands,
  finishedCommands,
  repositories,
  repositoryStatus,
  rightPanelWidth,
  runningCommands,
  selectedDirectories,
  selectedProjects,
  selectedWorkspace,
  workspaces,
});
