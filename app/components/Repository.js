'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import RepositoryFile from './RepositoryFile';
import RepositoryCommit from './RepositoryCommit';
import RepositoryCheckout from './RepositoryCheckout';
import RepositoryLog from './RepositoryLog';
import Button from './Button';
import Commands from './Commands';

export default class Repository extends Component {
  static propTypes = {
    checkoutBranch: PropTypes.string.isRequired,
    defaultBranch: PropTypes.string.isRequired,
    checkoutHistory: PropTypes.array.isRequired,
    clipboardCopy: PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
    commitFiles: PropTypes.object.isRequired,
    commitMessage: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired,
    editFile: PropTypes.func.isRequired,
    gitBranch: PropTypes.func.isRequired,
    gitCheckout: PropTypes.func.isRequired,
    gitCommit: PropTypes.func.isRequired,
    gitLog: PropTypes.func.isRequired,
    gitPull: PropTypes.func.isRequired,
    gitPush: PropTypes.func.isRequired,
    gitStatus: PropTypes.func.isRequired,
    gitFetch: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    removeFile: PropTypes.func.isRequired,
    repositoryBranch: PropTypes.array.isRequired,
    repositoryLog: PropTypes.array.isRequired,
    repositoryStatus: PropTypes.object.isRequired,
    runningGit: PropTypes.array,
    section: PropTypes.string.isRequired,
    setCheckoutBranch: PropTypes.func.isRequired,
    setCommitMessage: PropTypes.func.isRequired,
    toggleCommitFile: PropTypes.func.isRequired,
    toggleSection: PropTypes.func.isRequired,
    executeCommand: PropTypes.func.isRequired,
    selectedCommands: PropTypes.object.isRequired,
    removeCommand: PropTypes.func.isRequired,
    repositoryCommands: PropTypes.object.isRequired,
    selectCommand: PropTypes.func.isRequired,
    killCommand: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.onClickFetch();
  }

  onClickHeader() {
    this.props.toggleSection(this.props.section);
  }

  onClickFetch() {
    this.props.gitFetch(this.props.id);
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
        repositoryId={this.props.id}
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
        repositoryId={this.props.id}
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
        repositoryId={this.props.id}
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
        repositoryId={this.props.id}
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

  renderCommands() {
    return (
      <Commands
        repositoryId={this.props.id}
        commands={this.props.repositoryCommands}
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
        {this.renderCommands()}
      </div>
    );
  }

  render() {
    return (
      <section>
        <header onClick={this.onClickHeader}>
          <span>
            <i className='icon icon-repo' />
            {this.props.name}
          </span>
          {this.renderFetch()}
        </header>
        {this.props.collapsed || this.renderBody()}
      </section>
    );
  }
}
