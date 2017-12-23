'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import cx from 'classnames';
import Button from './Button';

export default class Workspace extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired,
    env: PropTypes.object.isRequired,
    file: PropTypes.string.isRequired,
    failed: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    selected: PropTypes.bool.isRequired,
    editFile: PropTypes.func.isRequired,
    selectWorkspace: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClick() {
    this.props.selectWorkspace(this.props.id);
  }

  onClickEdit() {
    this.props.editFile(this.props.file);
  }

  render() {
    const className = cx({
      selected: this.props.selected,
      failed: this.props.failed,
    });
    return (
      <li onClick={this.onClick} className={className}>
        {this.props.label || this.props.name}
        <Button icon='pencil' onClick={this.onClickEdit} />
      </li>
    );
  }
}
