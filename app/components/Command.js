'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import Button from './Button';

export default class Command extends Component {
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    command: PropTypes.object.isRequired,
    repository: PropTypes.string.isRequired,
    executeCommand: PropTypes.func.isRequired,
    selectCommand: PropTypes.func.isRequired,
    killCommand: PropTypes.func.isRequired,
    removeCommand: PropTypes.func.isRequired,
    editFile: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClick() {
    this.props.selectCommand(
      this.props.repository,
      this.props.selected ? null : this.props.command.input
    );
  }

  onClickExecute() {
    this.props.executeCommand(this.props.repository, this.props.command.input);
  }

  onClickKill() {
    this.props.killCommand(this.props.command);
  }

  onClickProgress() {
    this.props.editFile(this.props.command.output);
  }

  onClickRemove() {
    this.props.removeCommand(this.props.repository, this.props.command.input);
  }

  renderProgress() {
    let icon = 'spinner';
    if (this.props.command.stderr) {
      icon = 'exclamation-triangle';
    } else if (this.props.command.stdout) {
      icon = 'check';
    }
    return (
      <Button
        spin={!!this.props.command.running && icon === 'spinner'}
        colored={!this.props.command.running}
        icon={icon}
        onClick={this.onClickProgress}
      />
    );
  }

  renderPlay() {
    if (this.props.command.running) {
      return (
        <Button icon='pause' onClick={this.onClickKill} />
      );
    }
    return (
      <Button icon='play' onClick={this.onClickExecute} />
    );
  }

  renderRemove() {
    return (
      <Button icon='trash-o' onClick={this.onClickRemove} />
    );
  }

  render() {
    return (
      <li onClick={this.onClick} className={this.props.selected ? 'selected' : null}>
        <span>{this.props.command.input}</span>
        {this.renderPlay()}
        {this.renderProgress()}
        {this.props.selected && this.renderRemove()}
      </li>
    );
  }
}
