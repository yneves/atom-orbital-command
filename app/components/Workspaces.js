'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import Workspace from './Workspace';
import Button from './Button';

export default class Workspaces extends Component {

  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    section: PropTypes.string.isRequired,
    workspaces: PropTypes.array.isRequired,
    selectedWorkspace: PropTypes.string,
    loadWorkspaces: PropTypes.func.isRequired,
    editFile: PropTypes.func.isRequired,
    selectWorkspace: PropTypes.func.isRequired,
    toggleSection: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderWorkspace(workspace) {
    return (
      <Workspace
        key={workspace.id}
        selected={workspace.id === this.props.selectedWorkspace}
        editFile={this.props.editFile}
        selectWorkspace={this.props.selectWorkspace}
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
}
