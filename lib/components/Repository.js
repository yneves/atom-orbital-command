'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import RepositoryFile from './RepositoryFile';
import RepositoryCommit from './RepositoryCommit';
import Button from './Button';

export default class Repository extends Component {

  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    section: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gitCommit: PropTypes.func.isRequired,
    gitStatus: PropTypes.func.isRequired,
    toggleCommitFile: PropTypes.func.isRequired,
    setCommitMessage: PropTypes.func.isRequired,
    commitMessage: PropTypes.string.isRequired,
    commitFiles: PropTypes.array.isRequired,
    repositoryStatus: PropTypes.object.isRequired,
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
      return this.props.repositoryStatus.files.map(this.renderFile);
    }
  }

  getTitle() {
    const {name, repositoryStatus} = this.props;
    return repositoryStatus ? name + '/' + repositoryStatus.local_branch : name;
  }

  render() {
    return (
      <section>
        <header onClick={this.onClickHeader}>
          {this.getTitle()}
          {this.renderReload()}
        </header>
        <ul>
          {this.renderFiles()}
        </ul>
        {this.renderCommit()}
      </section>
    );
  }
};
