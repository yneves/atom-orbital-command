'use babel';

import React, { PropTypes, Component } from 'react';
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
    selected: PropTypes.bool.isRequired,
    editFile: PropTypes.func.isRequired,
    openTerminal: PropTypes.func.isRequired,
    selectWorkspace: PropTypes.func.isRequired
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

  onClickTerminal() {
    this.props.openTerminal(this.props.dir, this.props.env);
  }

  render() {
    const className = cx({
      selected: this.props.selected,
      failed: this.props.failed,
    });
    return (
      <li onClick={this.onClick} className={className}>
        {this.props.name}
        <Button icon='pencil' onClick={this.onClickEdit} />
        <Button icon='terminal' onClick={this.onClickTerminal} />
      </li>
    );
  }
};
