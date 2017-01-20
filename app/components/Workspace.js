'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import R from 'ramda';
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
    openTerminal: PropTypes.func.isRequired,
    selectWorkspace: PropTypes.func.isRequired,
    terminalActive: PropTypes.bool.isRequired,
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
    const terminal = R.pick(['dir', 'env'], this.props);
    this.props.openTerminal(terminal);
  }

  renderTerminal() {
    return this.props.terminalActive && (
      <Button icon='terminal' onClick={this.onClickTerminal} />
    );
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
        {this.renderTerminal()}
      </li>
    );
  }
}
