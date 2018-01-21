'use babel';

import { connect } from 'react-redux';
import actions from '../actions';
import Repositories from '../components/Repositories';

const mapStateToProps = (state, { repository }) => {
  const {
    checkoutBranch,
    checkoutHistory,
    commandInput,
    commitFiles,
    commitMessages,
    defaultBranch,
    repositoryBranch,
    repositoryLog,
    repositoryStatus,
    runningGit,
    collapsedSections,
  } = state;

  return {
    checkoutBranch: checkoutBranch[repository],
    checkoutHistory: checkoutHistory[repository],
    commandInput: commandInput[repository],
    commitFiles: commitFiles[repository],
    commitMessage: commitMessages[repository],
    defaultBranch: defaultBranch[repository],
    branches: repositoryBranch[repository],
    commits: repositoryLog[repository],
    currentBranch: repositoryStatus[repository] && repositoryStatus[repository].local_branch,
    changedFiles: repositoryStatus[repository] && repositoryStatus[repository].files,
    runningGit: runningGit[repository],
    collapsedSections,
  };
};

export default connect(mapStateToProps, actions)(Repositories);
