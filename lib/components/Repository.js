'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import RepositoryFile from './RepositoryFile';
import RepositoryCommit from './RepositoryCommit';
import RepositoryCheckout from './RepositoryCheckout';
import Button from './Button';

export default class Repository extends Component {

  static propTypes = {
    checkoutBranch: PropTypes.string.isRequired,
    repositoryBranch: PropTypes.array.isRequired,
    collapsed: PropTypes.bool.isRequired,
    commitFiles: PropTypes.array.isRequired,
    commitMessage: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired,
    editFile: PropTypes.func.isRequired,
    gitCheckout: PropTypes.func.isRequired,
    gitCommit: PropTypes.func.isRequired,
    gitStatus: PropTypes.func.isRequired,
    gitBranch: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    repositoryStatus: PropTypes.object.isRequired,
    section: PropTypes.string.isRequired,
    setCheckoutBranch: PropTypes.func.isRequired,
    setCommitMessage: PropTypes.func.isRequired,
    toggleCommitFile: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClickHeader() {
    this.props.toggleSection(this.props.section);
  }

  onClickReload() {
    this.props.gitStatus(this.props.id);
    this.props.gitBranch(this.props.id);
  }

  renderReload() {
    return (
      <Button
        icon='refresh'
        onClick={this.onClickReload}
      />
    );
  }

  renderFile(file, index) {
    return (
      <RepositoryFile
        key={index}
        repositoryId={this.props.id}
        checked={this.props.commitFiles.includes(file.file)}
        editFile={this.props.editFile}
        toggleCommitFile={this.props.toggleCommitFile}
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
    if (this.props.repositoryStatus) {
      return (
        <ul>
          {this.props.repositoryStatus.files.map(this.renderFile)}
        </ul>
      );
    }
  }

  renderCheckout() {
    return (
      <RepositoryCheckout
        repositoryId={this.props.id}
        gitCheckout={this.props.gitCheckout}
        checkoutBranch={this.props.checkoutBranch}
        setCheckoutBranch={this.props.setCheckoutBranch}
        repositoryBranch={this.props.repositoryBranch}
      />
    );
  }

  render() {
    return (
      <section>
        <header onClick={this.onClickHeader}>
          {this.props.name}
          {this.renderReload()}
        </header>
        {this.renderCheckout()}
        {this.renderFiles()}
        {this.renderCommit()}
      </section>
    );
  }
};
