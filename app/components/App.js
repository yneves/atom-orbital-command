'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import Resizer from './Resizer';
import RepositoriesContainer from '../containers/RepositoriesContainer';
import RepositoryContainer from '../containers/RepositoryContainer';
import TerminalContainer from '../containers/TerminalContainer';


export default class App extends Component {
  static propTypes = {
    element: PropTypes.object.isRequired,
    openRepositories: PropTypes.array.isRequired,
    resizeRightPanel: PropTypes.func.isRequired,
    rightPanelWidth: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(props);
  }

  render() {
    const parts = [];
    this.props.openRepositories.forEach((repository) => {
      parts.push(<RepositoryContainer key={`repository:${repository}`} repository={repository} />);
      parts.push(<TerminalContainer key={`terminal:${repository}`} repository={repository} />);
    });
    return (
      <div className='orbital-command__app'>
        <RepositoriesContainer />
        {parts}
        <Resizer
          element={this.props.element}
          resizeRightPanel={this.props.resizeRightPanel}
          rightPanelWidth={this.props.rightPanelWidth}
        />
      </div>
    );
  }
}
