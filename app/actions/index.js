'use babel';

import editFile from './editFile';
import executeCommand from './executeCommand';
import fileSaved from './fileSaved';
import gitBranch from './gitBranch';
import gitCheckout from './gitCheckout';
import gitCommit from './gitCommit';
import gitFetch from './gitFetch';
import gitLog from './gitLog';
import gitPull from './gitPull';
import gitPush from './gitPush';
import gitStatus from './gitStatus';
import killCommand from './killCommand';
import removeCommand from './removeCommand';
import refreshDirectory from './refreshDirectory';
import removeFile from './removeFile';
import resizeRightPanel from './resizeRightPanel';
import selectCommand from './selectCommand';
import setCheckoutBranch from './setCheckoutBranch';
import setCommitMessage from './setCommitMessage';
import startup from './startup';
import toggleCommitFile from './toggleCommitFile';
import toggleDirectory from './toggleDirectory';
import toggleSection from './toggleSection';
import setCommandInput from './setCommandInput';
import findRepositories from './findRepositories';
import pinRepository from './pinRepository';

export default {
  pinRepository,
  findRepositories,
  editFile,
  executeCommand,
  fileSaved,
  gitBranch,
  gitCheckout,
  gitCommit,
  gitFetch,
  gitLog,
  gitPull,
  gitPush,
  gitStatus,
  killCommand,
  removeCommand,
  refreshDirectory,
  removeFile,
  resizeRightPanel,
  selectCommand,
  setCheckoutBranch,
  setCommitMessage,
  setCommandInput,
  startup,
  toggleCommitFile,
  toggleDirectory,
  toggleSection,
};
