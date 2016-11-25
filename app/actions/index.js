'use babel';

import browserClosed from './browserClosed';
import editFile from './editFile';
import executeCommand from './executeCommand';
import fileSaved from './fileSaved';
import gitBranch from './gitBranch';
import gitCheckout from './gitCheckout';
import gitCommit from './gitCommit';
import gitStatus from './gitStatus';
import gitPull from './gitPull';
import killCommand from './killCommand';
import loadWorkspaces from './loadWorkspaces';
import openBookmark from './openBookmark';
import openTerminal from './openTerminal';
import browserOpened from './browserOpened';
import refreshTabs from './refreshTabs';
import resizeRightPanel from './resizeRightPanel';
import selectWorkspace from './selectWorkspace';
import setBrowserIcon from './setBrowserIcon';
import setCheckoutBranch from './setCheckoutBranch';
import setCommitMessage from './setCommitMessage';
import toggleCommitFile from './toggleCommitFile';
import toggleDirectory from './toggleDirectory';
import toggleProject from './toggleProject';
import toggleRepository from './toggleRepository';
import toggleSection from './toggleSection';
import viewCommandOutput from './viewCommandOutput';
import terminalOpened from './terminalOpened';
import terminalClosed from './terminalClosed';
import removeFile from './removeFile';
import startup from './startup';

export default {
  startup,
  removeFile,
  terminalOpened,
  terminalClosed,
  browserClosed,
  editFile,
  executeCommand,
  fileSaved,
  gitBranch,
  gitCheckout,
  gitCommit,
  gitStatus,
  gitPull,
  killCommand,
  loadWorkspaces,
  openBookmark,
  openTerminal,
  browserOpened,
  refreshTabs,
  resizeRightPanel,
  selectWorkspace,
  setBrowserIcon,
  setCheckoutBranch,
  setCommitMessage,
  toggleCommitFile,
  toggleDirectory,
  toggleProject,
  toggleRepository,
  toggleSection,
  viewCommandOutput,
};
