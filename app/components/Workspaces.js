'use babel';

import React, { PropTypes, Component } from 'react';
import Workspace from './Workspace';
import Button from './Button';
import autoBind from 'class-autobind';

export default class Workspaces extends Component {

  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    section: PropTypes.string.isRequired,
    workspaces: PropTypes.array.isRequired,
    selectedWorkspace: PropTypes.string,
    loadWorkspaces: PropTypes.func.isRequired,
    editFile: PropTypes.func.isRequired,
    openTerminal: PropTypes.func.isRequired,
    selectWorkspace: PropTypes.func.isRequired,
    terminalActive: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderWorkspace(workspace, index) {
    return (
      <Workspace
        key={workspace.id}
        selected={workspace.id === this.props.selectedWorkspace}
        editFile={this.props.editFile}
        openTerminal={this.props.openTerminal}
        selectWorkspace={this.props.selectWorkspace}
        terminalActive={this.props.terminalActive}
        {...workspace}
      />
    );
  }

  filterCollapsed(workspace) {
    return !this.props.collapsed ||
      workspace.id === this.props.selectedWorkspace;
  }

  onClickHeader() {
    this.props.toggleSection(this.props.section);
  }

  onClickReload() {
    this.props.loadWorkspaces();
  }

  renderReload() {
    return (
      <Button
        icon='refresh'
        onClick={this.onClickReload}
      />
    );
  }

  render() {
    return (
      <section>
        <header onClick={this.onClickHeader}>
          {this.renderReload()}
          Workspaces
        </header>
        <ul>
          {this.props.workspaces
            .filter(this.filterCollapsed)
            .map(this.renderWorkspace, this)}
        </ul>
      </section>
    );
  }
};
