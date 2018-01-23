'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import RepositoryFile from './RepositoryFile';
import RepositoryCommit from './RepositoryCommit';
import RepositoryCheckout from './RepositoryCheckout';
import RepositoryLog from './RepositoryLog';
import Button from './Button';
import Terminal from './Terminal';

export default class Repository extends Component {
  static propTypes = {
    editFile: PropTypes.func.isRequired,
    gitBranch: PropTypes.func.isRequired,
    gitCheckout: PropTypes.func.isRequired,
    gitCommit: PropTypes.func.isRequired,
    gitLog: PropTypes.func.isRequired,
    gitPull: PropTypes.func.isRequired,
    gitPush: PropTypes.func.isRequired,
    gitStatus: PropTypes.func.isRequired,
    gitFetch: PropTypes.func.isRequired,
    removeFile: PropTypes.func.isRequired,
    setCheckoutBranch: PropTypes.func.isRequired,
    setCommitMessage: PropTypes.func.isRequired,
    toggleCommitFile: PropTypes.func.isRequired,
    toggleSection: PropTypes.func.isRequired,
    executeCommand: PropTypes.func.isRequired,
    removeCommand: PropTypes.func.isRequired,
    selectCommand: PropTypes.func.isRequired,
    killCommand: PropTypes.func.isRequired,
    setCommandInput: PropTypes.func.isRequired,
    commandInput: PropTypes.string.isRequired,

    repository: PropTypes.object.isRequired,
    checkoutBranch: PropTypes.string.isRequired,
    defaultBranch: PropTypes.string.isRequired,
    checkoutHistory: PropTypes.array.isRequired,
    collapsedSections: PropTypes.array.isRequired,
    commitFiles: PropTypes.object.isRequired,
    commitMessage: PropTypes.string.isRequired,
    repositoryBranch: PropTypes.array.isRequired,
    repositoryLog: PropTypes.array.isRequired,
    repositoryStatus: PropTypes.object.isRequired,
    runningGit: PropTypes.array,
    section: PropTypes.string.isRequired,
    selectedCommands: PropTypes.object.isRequired,
    repositoryCommands: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  getSectionName() {
    return `repository:${this.props.repository.dir}`;
  }

  isCollapsed() {
    return this.props.collapsedSections.includes(this.getSectionName());
  }

  onClickHeader() {
    this.props.toggleSection(this.getSectionName());
  }

  onClickFetch() {
    this.props.gitFetch(this.props.repository.id);
  }

  renderFetch() {
    return (
      <Button
        octicon='git-compare'
        onClick={this.onClickFetch}
      />
    );
  }

  renderFile(file, index) {
    return (
      <RepositoryFile
        key={index}
        repositoryId={this.props.repository.id}
        checked={this.props.commitFiles[file.file]}
        editFile={this.props.editFile}
        branch={this.props.repositoryStatus.local_branch}
        gitCheckout={this.props.gitCheckout}
        toggleCommitFile={this.props.toggleCommitFile}
        removeFile={this.props.removeFile}
        {...file}
      />
    );
  }

  canCommit() {
    return !!(this.props.repositoryStatus &&
      this.props.repositoryStatus.local_branch &&
      this.props.repositoryStatus.files.length);
  }

  renderCommit() {
    return this.canCommit() && (
      <RepositoryCommit
        repositoryId={this.props.repository.id}
        gitCommit={this.props.gitCommit}
        commitMessage={this.props.commitMessage}
        setCommitMessage={this.props.setCommitMessage}
      />
    );
  }

  renderFiles() {
    return this.props.repositoryStatus && (
      <ul>
        {this.props.repositoryStatus.files.map(this.renderFile)}
      </ul>
    );
  }

  renderCheckout() {
    return (
      <RepositoryCheckout
        repositoryId={this.props.repository.id}
        runningGit={this.props.runningGit}
        gitPull={this.props.gitPull}
        gitCheckout={this.props.gitCheckout}
        gitStatus={this.props.gitStatus}
        defaultBranch={this.props.defaultBranch}
        currentBranch={this.props.repositoryStatus.local_branch}
        checkoutBranch={this.props.checkoutBranch}
        checkoutHistory={this.props.checkoutHistory}
        setCheckoutBranch={this.props.setCheckoutBranch}
        repositoryBranch={this.props.repositoryBranch}
      />
    );
  }

  renderProgress() {
    return Boolean(this.props.runningGit && this.props.runningGit.length) && (
      <ul>
        {this.props.runningGit.map((command, index) => (
          <li key={index}>
            <span>{command}</span>
            <Button icon='spinner' spin />
          </li>
        ))}
      </ul>
    );
  }

  renderLog(entry, index) {
    return (
      <RepositoryLog
        key={index}
        gitPush={this.props.gitPush}
        repositoryId={this.props.repository.id}
        currentBranch={this.props.repositoryStatus.local_branch}
        isLatestCommit={index === 0}
        {...entry} />
    );
  }

  renderLogs() {
    return !!this.props.repositoryLog.length && (
      <ul className='scroll'>
        {this.props.repositoryLog.map(this.renderLog)}
      </ul>
    );
  }

  renderTerminal() {
    return (
      <Terminal
        collapsedSections={this.props.collapsedSections}
        toggleSection={this.props.toggleSection}
        repository={this.props.repository.id}
        commands={this.props.repositoryCommands}
        commandInput={this.props.commandInput}
        setCommandInput={this.props.setCommandInput}
        selectedCommands={this.props.selectedCommands}
        editFile={this.props.editFile}
        removeCommand={this.props.removeCommand}
        selectCommand={this.props.selectCommand}
        executeCommand={this.props.executeCommand}
        killCommand={this.props.killCommand} />
    );
  }

  renderBody() {
    return (
      <div>
        {this.renderCheckout()}
        {this.renderLogs()}
        {this.renderFiles()}
        {this.renderCommit()}
        {this.renderProgress()}
      </div>
    );
  }

  render() {
    return (
      <div>
        <section>
          <header onClick={this.onClickHeader}>
            <span>
              <i className='icon icon-repo' />
              {this.props.repository.name}
            </span>
            {this.renderFetch()}
          </header>
          {this.isCollapsed() || this.renderBody()}
        </section>
        {this.renderTerminal()}
      </div>
    );
  }
}
