'use babel';

import React, { PropTypes, Component } from 'react';
import Workspace from './Workspace';

export default class Workspaces extends Component {

  static propTypes = {
    workspaces: PropTypes.array.isRequired,
    selectedWorkspace: PropTypes.string,
    editFile: PropTypes.func.isRequired,
    openTerminal: PropTypes.func.isRequired,
    selectWorkspace: PropTypes.func.isRequired
  };

  renderWorkspace(workspace, index) {
    return (
      <Workspace
        key={index}
        selected={workspace.id === this.props.selectedWorkspace}
        editFile={this.props.editFile}
        openTerminal={this.props.openTerminal}
        selectWorkspace={this.props.selectWorkspace}
        {...workspace}
      />
    );
  }

  render() {
    return (
      <section>
        <header>
          Workspaces
        </header>
        <ul>
          {this.props.workspaces.map(this.renderWorkspace, this)}
        </ul>
      </section>
    );
  }
};
