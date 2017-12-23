'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import cx from 'classnames';
import Button from './Button';

export default class Project extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired,
    env: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    selectedProject: PropTypes.bool.isRequired,
    selectedDirectory: PropTypes.bool.isRequired,
    toggleProject: PropTypes.func.isRequired,
    toggleDirectory: PropTypes.func.isRequired,
    toggleSection: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClick() {
    this.props.toggleProject(this.props.id);
  }

  onClickDirectory() {
    this.props.toggleDirectory(this.props.dir);
  }

  renderDirectory() {
    return (
      <Button
        icon={this.props.selectedDirectory ? 'folder-open' : 'folder'}
        active={this.props.selectedDirectory}
        onClick={this.onClickDirectory}
      />
    );
  }

  render() {
    const className = cx({
      selected: this.props.selectedProject,
    });
    return (
      <li onClick={this.onClick} className={className}>
        {this.props.name}
        {this.renderDirectory()}
      </li>
    );
  }
}
