'use babel';

import { combineReducers } from 'redux';
import checkoutBranch from './checkoutBranch';
import collapsedSections from './collapsedSections';
import commitFiles from './commitFiles';
import commitMessages from './commitMessages';
import config from './config';
import failedCommands from './failedCommands';
import finishedCommands from './finishedCommands';
import repositories from './repositories';
import repositoryBranch from './repositoryBranch';
import repositoryLog from './repositoryLog';
import repositoryStatus from './repositoryStatus';
import rightPanelWidth from './rightPanelWidth';
import runningCommands from './runningCommands';
import runningGit from './runningGit';
import selectedDirectories from './selectedDirectories';
import selectedProjects from './selectedProjects';
import selectedWorkspace from './selectedWorkspace';
import workspaces from './workspaces';
import checkoutHistory from './checkoutHistory';
import defaultBranch from './defaultBranch';

export default combineReducers({
  defaultBranch,
  checkoutBranch,
  checkoutHistory,
  collapsedSections,
  commitFiles,
  commitMessages,
  config,
  failedCommands,
  finishedCommands,
  repositories,
  repositoryBranch,
  repositoryLog,
  repositoryStatus,
  rightPanelWidth,
  runningCommands,
  runningGit,
  selectedDirectories,
  selectedProjects,
  selectedWorkspace,
  workspaces,
});
