'use babel';

import React, { PropTypes, Component } from 'react';
import Workspaces from './Workspaces';
import Projects from './Projects';
import Commands from './Commands';
import Resizer from './Resizer';

export default class App extends Component {

  static propTypes = {
    element: PropTypes.object.isRequired,
    resizeRightPanel: PropTypes.func.isRequired,
    rightPanelWidth: PropTypes.number.isRequired,
    workspaces: PropTypes.array.isRequired,
    selectedWorkspace: PropTypes.string,
    selectedProjects: PropTypes.array.isRequired,
    selectedDirectories: PropTypes.array.isRequired,
    runningCommands: PropTypes.object.isRequired,
    finishedCommands: PropTypes.object.isRequired,
    failedCommands: PropTypes.object.isRequired,
    editFile: PropTypes.func.isRequired,
    openTerminal: PropTypes.func.isRequired,
    loadWorkspaces: PropTypes.func.isRequired,
    selectWorkspace: PropTypes.func.isRequired,
    openTerminal: PropTypes.func.isRequired,
    toggleProject: PropTypes.func.isRequired,
    toggleDirectory: PropTypes.func.isRequired,
    executeCommand: PropTypes.func.isRequired,
    killCommand: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadWorkspaces();
  }

  getSelectedWorkspace() {
    return this.props.workspaces
      .filter(w => w.id === this.props.selectedWorkspace)
      .shift();
  }

  renderProjects() {
    const workspace = this.getSelectedWorkspace();
    if (workspace && workspace.projects) {
      return (
        <Projects
          {...this.props}
          projects={workspace.projects}
          workspace={workspace}
        />
      );
    }
  }

  renderCommands() {
    const workspace = this.getSelectedWorkspace();
    if (workspace && workspace.commands) {
      return (
        <Commands
          {...this.props}
          commands={workspace.commands}
          workspace={workspace}
        />
      );
    }
  }

  render() {
    return (
      <div className='chloe__app'>
        <Workspaces {...this.props} />
        {this.renderProjects()}
        {this.renderCommands()}
        <Resizer
          element={this.props.element}
          resizeRightPanel={this.props.resizeRightPanel}
          rightPanelWidth={this.props.rightPanelWidth}
        />
      </div>
    );
  }
};
