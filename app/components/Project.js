'use babel';

import React, { PropTypes, Component } from 'react';
import R from 'ramda';
import autoBind from 'class-autobind';
import cx from 'classnames';
import Button from './Button';

export default class Project extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired,
    env: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    repositoryActive: PropTypes.bool.isRequired,
    selectedProject: PropTypes.bool.isRequired,
    selectedDirectory: PropTypes.bool.isRequired,
    openTerminal: PropTypes.func.isRequired,
    toggleProject: PropTypes.func.isRequired,
    toggleDirectory: PropTypes.func.isRequired,
    terminalActive: PropTypes.bool.isRequired,
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

  onClickTerminal() {
    this.props.openTerminal(R.pick(['id', 'dir', 'env'], this.props));
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

  renderTerminal() {
    return this.props.terminalActive && (
      <Button
        icon='terminal'
        onClick={this.onClickTerminal}
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
        {this.renderTerminal()}
      </li>
    );
  }
}
