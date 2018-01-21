'use babel';

import { combineReducers } from 'redux';
import checkoutBranch from './checkoutBranch';
import checkoutHistory from './checkoutHistory';
import collapsedSections from './collapsedSections';
import repositoryCommands from './repositoryCommands';
import commitFiles from './commitFiles';
import commitMessages from './commitMessages';
import config from './config';
import defaultBranch from './defaultBranch';
import repositories from './repositories';
import repositoryBranch from './repositoryBranch';
import repositoryLog from './repositoryLog';
import repositoryStatus from './repositoryStatus';
import rightPanelWidth from './rightPanelWidth';
import runningGit from './runningGit';
import selectedDirectories from './selectedDirectories';
import selectedCommands from './selectedCommands';
import commandInput from './commandInput';
import localRepositories from './localRepositories';
import pinnedRepositories from './pinnedRepositories';

export default combineReducers({
  localRepositories,
  pinnedRepositories,
  commandInput,
  checkoutBranch,
  checkoutHistory,
  collapsedSections,
  repositoryCommands,
  commitFiles,
  commitMessages,
  config,
  defaultBranch,
  repositories,
  repositoryBranch,
  repositoryLog,
  repositoryStatus,
  rightPanelWidth,
  runningGit,
  selectedDirectories,
  selectedCommands,
});
