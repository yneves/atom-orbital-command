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
    branch: PropTypes.string.isRequired,
    files: PropTypes.array.isRequired,
    gitCommit: PropTypes.func.isRequired,
    loadRepository: PropTypes.func.isRequired,
    toggleRepositoryFile: PropTypes.func.isRequired,
    setCommitMessage: PropTypes.func.isRequired,
    commitMessage: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClickHeader() {
    this.props.toggleSection(this.props.section);
  }

  onClickReload() {
    this.props.loadRepository(this.props.id);
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
        toggleRepositoryFile={this.props.toggleRepositoryFile}
        {...file}
      />
    );
  }

  render() {
    return (
      <section>
        <header onClick={this.onClickHeader}>
          {this.props.name + '/' + this.props.branch}
          {this.renderReload()}
        </header>
        <ul>
          {this.props.files.map(this.renderFile)}
        </ul>
        <RepositoryCommit
          repositoryId={this.props.id}
          gitCommit={this.props.gitCommit}
          commitMessage={this.props.commitMessage}
          setCommitMessage={this.props.setCommitMessage}
        />
      </section>
    );
  }
};
