'use babel';

import React, { PropTypes, Component } from 'react';
import lodash from 'lodash';
import Workspaces from './Workspaces';
import Projects from './Projects';
import Commands from './Commands';
import Resizer from './Resizer';
import Repository from './Repository';

export default class App extends Component {

  static propTypes = {
    browserIcons: PropTypes.object.isRequired,
    removeFile: PropTypes.func.isRequired,
    setBrowserIcon: PropTypes.func.isRequired,
    refreshTabs: PropTypes.number.isRequired,
    openBookmark: PropTypes.func.isRequired,
    browserTabs: PropTypes.array.isRequired,
    gitBranch: PropTypes.func.isRequired,
    checkoutBranch: PropTypes.object.isRequired,
    checkoutHistory: PropTypes.array.isRequired,
    collapsedSections: PropTypes.array.isRequired,
    commitFiles: PropTypes.object.isRequired,
    commitMessages: PropTypes.object.isRequired,
    editFile: PropTypes.func.isRequired,
    element: PropTypes.object.isRequired,
    executeCommand: PropTypes.func.isRequired,
    failedCommands: PropTypes.object.isRequired,
    finishedCommands: PropTypes.object.isRequired,
    gitCheckout: PropTypes.func.isRequired,
    gitCommit: PropTypes.func.isRequired,
    gitStatus: PropTypes.func.isRequired,
    gitPull: PropTypes.func.isRequired,
    gitPush: PropTypes.func.isRequired,
    gitFetch: PropTypes.func.isRequired,
    gitLog: PropTypes.func.isRequired,
    killCommand: PropTypes.func.isRequired,
    clipboardCopy: PropTypes.func.isRequired,
    loadWorkspaces: PropTypes.func.isRequired,
    repositories: PropTypes.array.isRequired,
    repositoryStatus: PropTypes.object.isRequired,
    repositoryLog: PropTypes.object.isRequired,
    resizeRightPanel: PropTypes.func.isRequired,
    rightPanelWidth: PropTypes.number.isRequired,
    runningGit: PropTypes.object.isRequired,
    runningCommands: PropTypes.object.isRequired,
    selectedDirectories: PropTypes.array.isRequired,
    selectedProjects: PropTypes.array.isRequired,
    selectedWorkspace: PropTypes.string,
    selectWorkspace: PropTypes.func.isRequired,
    setCheckoutBranch: PropTypes.func.isRequired,
    setCommitMessage: PropTypes.func.isRequired,
    toggleCommitFile: PropTypes.func.isRequired,
    toggleDirectory: PropTypes.func.isRequired,
    toggleProject: PropTypes.func.isRequired,
    toggleSection: PropTypes.func.isRequired,
    viewCommandOutput: PropTypes.func.isRequired,
    workspaces: PropTypes.array.isRequired,
    repositoryBranch: PropTypes.object.isRequired,
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

  getCommands() {
    const workspace = this.getSelectedWorkspace();
    let commands = [];
    if (workspace && workspace.commands) {
      commands = commands.concat(workspace.commands);
      this.props.selectedProjects.forEach((id) => {
        const project = lodash.find(workspace.projects, proj => proj.id === id);
        if (project) {
          commands = commands.concat(project.commands);
        }
      });
    }
    return commands;
  }

  renderCommands() {
    const workspace = this.getSelectedWorkspace();
    const commands = this.getCommands();
    return Boolean(workspace && commands.length) && (
      <Commands
        {...this.props}
        commands={commands}
        workspace={workspace}
        section='commands'
        collapsed={this.props.collapsedSections.includes('commands')}
      />
    );
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
        gitBranch={this.props.gitBranch}
        gitCheckout={this.props.gitCheckout}
        gitPull={this.props.gitPull}
        gitLog={this.props.gitLog}
        gitPush={this.props.gitPush}
        gitFetch={this.props.gitFetch}
        removeFile={this.props.removeFile}
        toggleSection={this.props.toggleSection}
        toggleCommitFile={this.props.toggleCommitFile}
        setCommitMessage={this.props.setCommitMessage}
        setCheckoutBranch={this.props.setCheckoutBranch}
        repositoryStatus={this.props.repositoryStatus[repository.id] || ''}
        commitMessage={this.props.commitMessages[repository.id] || ''}
        runningGit={this.props.runningGit[repository.id]}
        checkoutBranch={this.props.checkoutBranch[repository.id] || ''}
        checkoutHistory={this.props.checkoutHistory[repository.id] || []}
        commitFiles={this.props.commitFiles[repository.id] || []}
        repositoryBranch={this.props.repositoryBranch[repository.id] || []}
        repositoryLog={this.props.repositoryLog[repository.id] || []}
        clipboardCopy={this.props.clipboardCopy}
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
      <div className='orbital-command__app'>
        {this.renderWorkspaces()}
        {this.renderProjects()}
        {this.renderCommands()}
        {this.props.repositories.map(this.renderRepository, this)}
        {this.renderResizer()}
      </div>
    );
  }
}
