'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import cx from 'classnames';
import Button from './Button';

export default class Project extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selectedProject: PropTypes.bool.isRequired,
    selectedDirectory: PropTypes.bool.isRequired,
    openTerminal: PropTypes.func.isRequired,
    toggleProject: PropTypes.func.isRequired,
    toggleDirectory: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClick() {
    this.props.toggleProject(this.props.id);
  }

  onClickTerminal(event) {
    event.stopPropagation();
    this.props.openTerminal(this.props.dir);
  }

  onClickDirectory(event) {
    event.stopPropagation();
    this.props.toggleDirectory(this.props.dir);
  }

  render() {
    const className = cx({
      selected: this.props.selectedProject,
    });
    return (
      <li onClick={this.onClick} className={className}>
        {this.props.name}
        <Button
          icon={this.props.selectedDirectory ? 'folder-open' : 'folder'}
          onClick={this.onClickDirectory}
        />
        <Button icon='terminal' onClick={this.onClickTerminal} />
      </li>
    );
  }
};
