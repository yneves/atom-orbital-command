'use babel';

import React, { PropTypes, Component } from 'react';
import R from 'ramda';
import Workspaces from './Workspaces';
import Projects from './Projects';
import Commands from './Commands';
import Resizer from './Resizer';
import Repository from './Repository';

export default class App extends Component {

  static propTypes = {
    element: PropTypes.object.isRequired,
    toggleSection: PropTypes.func.isRequired,
    collapsedSections: PropTypes.array.isRequired,
    resizeRightPanel: PropTypes.func.isRequired,
    rightPanelWidth: PropTypes.number.isRequired,
    workspaces: PropTypes.array.isRequired,
    repositories: PropTypes.array.isRequired,
    selectedWorkspace: PropTypes.string,
    selectedProjects: PropTypes.array.isRequired,
    selectedDirectories: PropTypes.array.isRequired,
    runningCommands: PropTypes.object.isRequired,
    finishedCommands: PropTypes.object.isRequired,
    failedCommands: PropTypes.object.isRequired,
    editFile: PropTypes.func.isRequired,
    openTerminal: PropTypes.func.isRequired,
    loadWorkspaces: PropTypes.func.isRequired,
    loadRepository: PropTypes.func.isRequired,
    selectWorkspace: PropTypes.func.isRequired,
    openTerminal: PropTypes.func.isRequired,
    toggleProject: PropTypes.func.isRequired,
    toggleDirectory: PropTypes.func.isRequired,
    toggleRepository: PropTypes.func.isRequired,
    executeCommand: PropTypes.func.isRequired,
    killCommand: PropTypes.func.isRequired,
    gitCommit: PropTypes.func.isRequired,
    viewCommandOutput: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // this.props.loadWorkspaces();
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
          section='projects'
          collapsed={this.props.collapsedSections.includes('projects')}
        />
      );
    }
  }

  getCommands() {
    const workspace = this.getSelectedWorkspace();
    let commands = [];
    if (workspace && workspace.commands) {
      commands = commands.concat(workspace.commands);
      this.props.selectedProjects.forEach(id => {
        const project = R.find(R.propEq('id', id), workspace.projects);
        if (project) {
          commands = commands.concat(project.commands);
        }
      });
    }
    return commands;
  }

  renderCommands() {
    const workspace = this.getSelectedWorkspace();
    if (workspace) {
      return (
        <Commands
          {...this.props}
          commands={this.getCommands()}
          workspace={workspace}
          section='commands'
          collapsed={this.props.collapsedSections.includes('commands')}
        />
      );
    }
  }

  renderRepository(repository, index) {
    return (
      <Repository
        key={index}
        section={repository.id}
        collapsed={this.props.collapsedSections.includes(repository.id)}
        loadRepository={this.props.loadRepository}
        gitCommit={this.props.gitCommit}
        {...repository}
      />
    );
  }

  render() {
    return (
      <div className='chloe__app'>
        <Workspaces
          {...this.props}
          section='workspaces'
          collapsed={this.props.collapsedSections.includes('workspaces')}
        />
        {this.renderProjects()}
        {this.renderCommands()}
        {this.props.repositories.map(this.renderRepository, this)}
        <Resizer
          element={this.props.element}
          resizeRightPanel={this.props.resizeRightPanel}
          rightPanelWidth={this.props.rightPanelWidth}
        />
      </div>
    );
  }
};
