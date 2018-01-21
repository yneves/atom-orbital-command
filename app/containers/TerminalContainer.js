'use babel';

import { connect } from 'react-redux';
import actions from '../actions';
import Repositories from '../components/Repositories';

const mapStateToProps = (state, { repository }) => {
  const {
    selectedCommands,
    repositoryCommands,
    collapsedSections,
  } = state;

  return {
    commands: repositoryCommands[repository],
    selectedCommands: selectedCommands[repository],
    collapsedSections,
  };
};

export default connect(mapStateToProps, actions)(Repositories);
