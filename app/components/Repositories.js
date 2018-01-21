'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import Button from './Button';

export default class Repository extends Component {
  static propTypes = {
    collapsedSections: PropTypes.array.isRequired,
    pinnedRepositories: PropTypes.array.isRequired,
    localRepositories: PropTypes.array.isRequired,
    selectedDirectories: PropTypes.array.isRequired,
    toggleDirectory: PropTypes.func.isRequired,
    toggleSection: PropTypes.func.isRequired,
    pinRepository: PropTypes.func.isRequired,
    findRepositories: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  getSectionName() {
    /* eslint class-methods-use-this: 0 */
    return 'repositories';
  }

  isCollapsed() {
    return this.props.collapsedSections.includes(this.getSectionName());
  }

  onClickHeader() {
    this.props.toggleSection(this.getSectionName());
  }

  renderItem(repository) {
    return (
      <li>
        <span>
          {repository}
        </span>
        <Button
          icon={this.props.selectedDirectories.includes(repository) ? 'folder-open' : 'folder'}
          onClick={() => this.props.toggleDirectory(repository)} />
        <Button
          icon='thumb-tack'
          colored={this.props.pinnedRepositories.includes(repository)}
          onClick={() => this.props.pinRepository(repository)} />
      </li>
    );
  }

  renderBody() {
    const { localRepositories, pinnedRepositories } = this.props;
    const unpinnedRepositories = localRepositories.filter(repo => !pinnedRepositories.includes(repo));
    return !!localRepositories.length && (
      <ul>
        {pinnedRepositories.map(this.renderItem)}
        {this.isCollapsed() || unpinnedRepositories.map(this.renderItem)}
      </ul>
    );
  }

  render() {
    return (
      <section>
        <header onClick={this.onClickHeader}>
          <span>
            Repositories
          </span>
          <Button icon='refresh' onClick={this.props.findRepositories} />
        </header>
        {this.renderBody()}
      </section>
    );
  }
}
