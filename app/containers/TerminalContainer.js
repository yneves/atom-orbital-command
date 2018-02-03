'use babel';

import { connect } from 'react-redux';
import actions from '../actions';
import Terminal from '../components/Terminal';

const mapStateToProps = (state, { repository }) => {
  const {
    commandInput,
    selectedCommands,
    repositoryCommands,
    collapsedSections,
  } = state;

  return {
    commandInput: commandInput[repository] || '',
    commands: repositoryCommands[repository] || [],
    selectedCommands: selectedCommands[repository] || [],
    collapsedSections,
  };
};

export default connect(mapStateToProps, actions)(Terminal);
