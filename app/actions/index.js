'use babel';

import clipboardCopy from './clipboardCopy';
import editFile from './editFile';
import executeCommand from './executeCommand';
import fileSaved from './fileSaved';
import gitBranch from './gitBranch';
import gitCheckout from './gitCheckout';
import gitCommit from './gitCommit';
import gitLog from './gitLog';
import gitPull from './gitPull';
import gitPush from './gitPush';
import gitStatus from './gitStatus';
import killCommand from './killCommand';
import loadWorkspaces from './loadWorkspaces';
import removeFile from './removeFile';
import resizeRightPanel from './resizeRightPanel';
import selectWorkspace from './selectWorkspace';
import setCheckoutBranch from './setCheckoutBranch';
import setCommitMessage from './setCommitMessage';
import startup from './startup';
import toggleCommitFile from './toggleCommitFile';
import toggleDirectory from './toggleDirectory';
import toggleProject from './toggleProject';
import toggleSection from './toggleSection';
import viewCommandOutput from './viewCommandOutput';
import refreshDirectory from './refreshDirectory';

export default {
  refreshDirectory,
  clipboardCopy,
  editFile,
  executeCommand,
  fileSaved,
  gitBranch,
  gitCheckout,
  gitCommit,
  gitLog,
  gitPull,
  gitPush,
  gitStatus,
  killCommand,
  loadWorkspaces,
  removeFile,
  resizeRightPanel,
  selectWorkspace,
  setCheckoutBranch,
  setCommitMessage,
  startup,
  toggleCommitFile,
  toggleDirectory,
  toggleProject,
  toggleSection,
  viewCommandOutput,
};
