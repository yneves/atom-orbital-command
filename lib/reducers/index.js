'use babel';

import { combineReducers } from 'redux';

import browserTabs from './browserTabs';
import checkoutBranch from './checkoutBranch';
import collapsedSections from './collapsedSections';
import commitFiles from './commitFiles';
import commitMessages from './commitMessages';
import failedCommands from './failedCommands';
import finishedCommands from './finishedCommands';
import repositories from './repositories';
import repositoryBranch from './repositoryBranch';
import repositoryStatus from './repositoryStatus';
import rightPanelWidth from './rightPanelWidth';
import runningCommands from './runningCommands';
import runningGit from './runningGit';
import selectedDirectories from './selectedDirectories';
import selectedProjects from './selectedProjects';
import selectedWorkspace from './selectedWorkspace';
import workspaces from './workspaces';

export default combineReducers({
  browserTabs,
  checkoutBranch,
  collapsedSections,
  commitFiles,
  commitMessages,
  failedCommands,
  finishedCommands,
  repositories,
  repositoryBranch,
  repositoryStatus,
  rightPanelWidth,
  runningCommands,
  runningGit,
  selectedDirectories,
  selectedProjects,
  selectedWorkspace,
  workspaces,
});
