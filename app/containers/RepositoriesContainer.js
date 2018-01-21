'use babel';

import { connect } from 'react-redux';
import actions from '../actions';
import Repositories from '../components/Repositories';

const mapStateToProps = (state) => {
  const {
    pinnedRepositories,
    localRepositories,
    selectedDirectories,
    collapsedSections,
  } = state;

  return {
    pinnedRepositories,
    localRepositories,
    selectedDirectories,
    collapsedSections,
  };
};

export default connect(mapStateToProps, actions)(Repositories);
