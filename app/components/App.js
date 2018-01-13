'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Workspaces from './Workspaces';
import Projects from './Projects';
import Resizer from './Resizer';
import Repository from './Repository';

export default class App extends Component {
  static propTypes = {
    removeFile: PropTypes.func.isRequired,
    gitBranch: PropTypes.func.isRequired,
    checkoutBranch: PropTypes.object.isRequired,
    checkoutHistory: PropTypes.array.isRequired,
    collapsedSections: PropTypes.array.isRequired,
    commitFiles: PropTypes.object.isRequired,
    commitMessages: PropTypes.object.isRequired,
    editFile: PropTypes.func.isRequired,
    element: PropTypes.object.isRequired,
    selectCommand: PropTypes.func.isRequired,
    executeCommand: PropTypes.func.isRequired,
    gitCheckout: PropTypes.func.isRequired,
    gitCommit: PropTypes.func.isRequired,
    gitStatus: PropTypes.func.isRequired,
    gitPull: PropTypes.func.isRequired,
    gitPush: PropTypes.func.isRequired,
    gitFetch: PropTypes.func.isRequired,
    gitLog: PropTypes.func.isRequired,
    killCommand: PropTypes.func.isRequired,
    loadWorkspaces: PropTypes.func.isRequired,
    repositories: PropTypes.array.isRequired,
    repositoryStatus: PropTypes.object.isRequired,
    repositoryLog: PropTypes.object.isRequired,
    resizeRightPanel: PropTypes.func.isRequired,
    rightPanelWidth: PropTypes.number.isRequired,
    runningGit: PropTypes.object.isRequired,
    selectedDirectories: PropTypes.array.isRequired,
    selectedProjects: PropTypes.array.isRequired,
    selectedWorkspace: PropTypes.string,
    selectWorkspace: PropTypes.func.isRequired,
    setCheckoutBranch: PropTypes.func.isRequired,
    setCommitMessage: PropTypes.func.isRequired,
    setCommandInput: PropTypes.func.isRequired,
    commandInput: PropTypes.object.isRequired,
    toggleCommitFile: PropTypes.func.isRequired,
    toggleDirectory: PropTypes.func.isRequired,
    toggleProject: PropTypes.func.isRequired,
    toggleSection: PropTypes.func.isRequired,
    viewCommandOutput: PropTypes.func.isRequired,
    workspaces: PropTypes.array.isRequired,
    defaultBranch: PropTypes.object.isRequired,
    repositoryBranch: PropTypes.object.isRequired,
    repositoryCommands: PropTypes.object.isRequired,
    removeCommand: PropTypes.func.isRequired,
    selectedCommands: PropTypes.object.isRequired,
  };

  getSelectedWorkspace() {
    return this.props.workspaces
      .filter(w => w.id === this.props.selectedWorkspace)
      .shift();
  }

  renderProjects() {
    const workspace = this.getSelectedWorkspace();
    return Boolean(workspace && workspace.projects.length) && (
      <Projects
        {...this.props}
        projects={workspace.projects}
        workspace={workspace}
        section='projects'
        collapsed={this.props.collapsedSections.includes('projects')}
      />
    );
  }

  renderRepository(repository, index) {
    return (
      <Repository
        checkoutBranch={this.props.checkoutBranch[repository.id] || ''}
        checkoutHistory={this.props.checkoutHistory[repository.id] || []}
        collapsed={this.props.collapsedSections.includes(repository.id)}
        commandInput={this.props.commandInput[repository.id]}
        commitFiles={this.props.commitFiles[repository.id] || []}
        commitMessage={this.props.commitMessages[repository.id] || ''}
        defaultBranch={this.props.defaultBranch[repository.id] || []}
        editFile={this.props.editFile}
        executeCommand={this.props.executeCommand}
        gitBranch={this.props.gitBranch}
        gitCheckout={this.props.gitCheckout}
        gitCommit={this.props.gitCommit}
        gitFetch={this.props.gitFetch}
        gitLog={this.props.gitLog}
        gitPull={this.props.gitPull}
        gitPush={this.props.gitPush}
        gitStatus={this.props.gitStatus}
        key={index}
        killCommand={this.props.killCommand}
        removeCommand={this.props.removeCommand}
        removeFile={this.props.removeFile}
        repository={repository}
        repositoryBranch={this.props.repositoryBranch[repository.id] || []}
        repositoryCommands={this.props.repositoryCommands[repository.id] || {}}
        repositoryLog={this.props.repositoryLog[repository.id] || []}
        repositoryStatus={this.props.repositoryStatus[repository.id] || ''}
        runningGit={this.props.runningGit[repository.id]}
        section={repository.id}
        selectCommand={this.props.selectCommand}
        selectedCommands={this.props.selectedCommands[repository.id] || {}}
        setCheckoutBranch={this.props.setCheckoutBranch}
        setCommandInput={this.props.setCommandInput}
        setCommitMessage={this.props.setCommitMessage}
        toggleCommitFile={this.props.toggleCommitFile}
        toggleSection={this.props.toggleSection}
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
      <div className='orbital-command__app'>
        {this.renderWorkspaces()}
        {this.renderProjects()}
        {this.props.repositories.map(this.renderRepository, this)}
        {this.renderResizer()}
      </div>
    );
  }
}
