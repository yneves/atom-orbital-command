'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import Button from './Button';

export default class Command extends Component {
  static propTypes = {
    command: PropTypes.object.isRequired,
    executeCommand: PropTypes.func.isRequired,
    killCommand: PropTypes.func.isRequired,
    editFile: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClickExecute() {
    this.props.executeCommand(this.props.command.repositoryId, this.props.command.input);
  }

  onClickKill() {
    this.props.killCommand(this.props.command);
  }

  onClickProgress() {
    this.props.editFile(this.props.command.output);
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

  render() {
    return (
      <li>
        <span>{this.props.command.input}</span>
        {this.renderPlay()}
        {this.renderProgress()}
      </li>
    );
  }
}
