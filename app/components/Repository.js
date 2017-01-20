'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import RepositoryFile from './RepositoryFile';
import RepositoryCommit from './RepositoryCommit';
import RepositoryCheckout from './RepositoryCheckout';
import RepositoryLog from './RepositoryLog';
import Button from './Button';

export default class Repository extends Component {

  static propTypes = {
    checkoutBranch: PropTypes.string.isRequired,
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    removeFile: PropTypes.func.isRequired,
    repositoryBranch: PropTypes.array.isRequired,
    repositoryLog: PropTypes.array.isRequired,
    repositoryStatus: PropTypes.object.isRequired,
    runningGit: PropTypes.string,
    section: PropTypes.string.isRequired,
    setCheckoutBranch: PropTypes.func.isRequired,
    setCommitMessage: PropTypes.func.isRequired,
    toggleCommitFile: PropTypes.func.isRequired,
    toggleRepository: PropTypes.func.isRequired,
    clipboardCopy: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.onClickRefresh();
  }

  onClickHeader() {
    this.props.toggleSection(this.props.section);
  }

  onClickClose() {
    this.props.toggleRepository(this.props.dir);
  }

  onClickGitPull() {
    this.props.gitPull(this.props.id);
  }

  onClickRefresh() {
    this.props.gitStatus(this.props.id);
    this.props.gitBranch(this.props.id);
  }

  renderGitPull() {
    return (
      <Button
        icon='arrow-circle-down'
        onClick={this.onClickGitPull}
      />
    );
  }

  renderGitStatus() {
    return (
      <Button
        icon='refresh'
        onClick={this.onClickRefresh}
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
        gitCheckout={this.props.gitCheckout}
        currentBranch={this.props.repositoryStatus.local_branch}
        checkoutBranch={this.props.checkoutBranch}
        setCheckoutBranch={this.props.setCheckoutBranch}
        repositoryBranch={this.props.repositoryBranch}
      />
    );
  }

  renderProgress() {
    return this.props.runningGit && (
      <ul>
        <li>
          <span>{this.props.runningGit}</span>
          <Button icon='spinner' spin />
        </li>
      </ul>
    );
  }

  renderLog(entry, index) {
    return (
      <RepositoryLog
        key={index}
        repositoryId={this.props.id}
        gitPush={this.props.gitPush}
        clipboardCopy={this.props.clipboardCopy}
        {...entry}
      />
    );
  }

  renderLogs() {
    return Boolean(this.props.repositoryLog.length) && (
      <ul>
        {this.props.repositoryLog.map(this.renderLog)}
      </ul>
    );
  }

  renderClose() {
    return this.props.collapsed && (
      <Button icon='times' onClick={this.onClickClose} />
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
      <section>
        <header onClick={this.onClickHeader}>
          <span className='icon icon-repo'></span>
          {this.props.name}
          {this.renderGitPull()}
          {this.renderGitStatus()}
          {this.renderClose()}
        </header>
        {this.props.collapsed || this.renderBody()}
      </section>
    );
  }
};
