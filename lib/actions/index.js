'use babel';

import editFile from './editFile';
import executeCommand from './executeCommand';
import gitCheckout from './gitCheckout';
import gitCommit from './gitCommit';
import gitStatus from './gitStatus';
import killCommand from './killCommand';
import loadWorkspaces from './loadWorkspaces';
import openTerminal from './openTerminal';
import resizeRightPanel from './resizeRightPanel';
import selectWorkspace from './selectWorkspace';
import setCheckoutBranch from './setCheckoutBranch';
import setCommitMessage from './setCommitMessage';
import toggleCommitFile from './toggleCommitFile';
import toggleDirectory from './toggleDirectory';
import toggleProject from './toggleProject';
import toggleRepository from './toggleRepository';
import toggleSection from './toggleSection';
import viewCommandOutput from './viewCommandOutput';
import gitBranch from './gitBranch';

export default {
  gitBranch,
  editFile,
  executeCommand,
  gitCheckout,
  gitCommit,
  gitStatus,
  killCommand,
  loadWorkspaces,
  openTerminal,
  resizeRightPanel,
  selectWorkspace,
  setCheckoutBranch,
  setCommitMessage,
  toggleCommitFile,
  toggleDirectory,
  toggleProject,
  toggleRepository,
  toggleSection,
  viewCommandOutput,
};
