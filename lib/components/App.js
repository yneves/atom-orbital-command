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
    collapsedSections: PropTypes.array.isRequired,
    commitMessages: PropTypes.object.isRequired,
    editFile: PropTypes.func.isRequired,
    element: PropTypes.object.isRequired,
    executeCommand: PropTypes.func.isRequired,
    failedCommands: PropTypes.object.isRequired,
    finishedCommands: PropTypes.object.isRequired,
    gitCommit: PropTypes.func.isRequired,
    killCommand: PropTypes.func.isRequired,
    gitStatus: PropTypes.func.isRequired,
    loadWorkspaces: PropTypes.func.isRequired,
    openTerminal: PropTypes.func.isRequired,
    openTerminal: PropTypes.func.isRequired,
    repositories: PropTypes.array.isRequired,
    resizeRightPanel: PropTypes.func.isRequired,
    rightPanelWidth: PropTypes.number.isRequired,
    runningCommands: PropTypes.object.isRequired,
    selectedDirectories: PropTypes.array.isRequired,
    selectedProjects: PropTypes.array.isRequired,
    selectedWorkspace: PropTypes.string,
    selectWorkspace: PropTypes.func.isRequired,
    setCommitMessage: PropTypes.func.isRequired,
    toggleDirectory: PropTypes.func.isRequired,
    toggleProject: PropTypes.func.isRequired,
    toggleRepository: PropTypes.func.isRequired,
    toggleCommitFile: PropTypes.func.isRequired,
    toggleSection: PropTypes.func.isRequired,
    viewCommandOutput: PropTypes.func.isRequired,
    workspaces: PropTypes.array.isRequired,
    commitFiles: PropTypes.object.isRequired,
    repositoryStatus: PropTypes.object.isRequired,
  };

  componentDidMount() {
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
        editFile={this.props.editFile}
        gitStatus={this.props.gitStatus}
        gitCommit={this.props.gitCommit}
        toggleCommitFile={this.props.toggleCommitFile}
        setCommitMessage={this.props.setCommitMessage}
        repositoryStatus={this.props.repositoryStatus[repository.id] || ''}
        commitMessage={this.props.commitMessages[repository.id] || ''}
        commitFiles={this.props.commitFiles[repository.id] || []}
        {...repository}
      />
    );
  }

  renderResizer() {
    return (
      <Resizer
        element={this.props.element}
        resizeRightPanel={this.props.resizeRightPanel}
        rightPanelWidth={this.props.rightPanelWidth}
      />
    );
  }

  renderWorkspaces() {
    return (
      <Workspaces
        {...this.props}
        section='workspaces'
        collapsed={this.props.collapsedSections.includes('workspaces')}
      />
    );
  }

  render() {
    return (
      <div className='chloe__app'>
        {this.renderWorkspaces()}
        {this.renderProjects()}
        {this.renderCommands()}
        {this.props.repositories.map(this.renderRepository, this)}
        {this.renderResizer()}
      </div>
    );
  }
};
