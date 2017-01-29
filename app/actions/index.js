'use babel';

import browserClosed from './browserClosed';
import browserOpened from './browserOpened';
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
import openBookmark from './openBookmark';
import openTerminal from './openTerminal';
import refreshTabs from './refreshTabs';
import removeFile from './removeFile';
import resizeRightPanel from './resizeRightPanel';
import selectWorkspace from './selectWorkspace';
import setBrowserIcon from './setBrowserIcon';
import setCheckoutBranch from './setCheckoutBranch';
import setCommitMessage from './setCommitMessage';
import startup from './startup';
import terminalClosed from './terminalClosed';
import terminalOpened from './terminalOpened';
import toggleCommitFile from './toggleCommitFile';
import toggleDirectory from './toggleDirectory';
import toggleProject from './toggleProject';
import toggleSection from './toggleSection';
import toggleTerminal from './toggleTerminal';
import viewCommandOutput from './viewCommandOutput';
import clipboardCopy from './clipboardCopy';

export default {
  browserClosed,
  browserOpened,
  editFile,
  executeCommand,
  fileSaved,
  gitBranch,
  gitCheckout,
  clipboardCopy,
  gitCommit,
  gitLog,
  gitPull,
  gitPush,
  gitStatus,
  killCommand,
  loadWorkspaces,
  openBookmark,
  openTerminal,
  refreshTabs,
  removeFile,
  resizeRightPanel,
  selectWorkspace,
  setBrowserIcon,
  setCheckoutBranch,
  setCommitMessage,
  startup,
  terminalClosed,
  terminalOpened,
  toggleCommitFile,
  toggleDirectory,
  toggleProject,
  toggleSection,
  toggleTerminal,
  viewCommandOutput,
};
