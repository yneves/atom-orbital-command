'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import cx from 'classnames';
import R from 'ramda';
import Button from './Button';

export default class Command extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired,
    command: PropTypes.string.isRequired,
    runningCommand: PropTypes.bool.isRequired,
    finishedCommand: PropTypes.bool.isRequired,
    failedCommand: PropTypes.bool.isRequired,
    executeCommand: PropTypes.func.isRequired,
    killCommand: PropTypes.func.isRequired,
    viewCommandOutput: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClickExecute(event) {
    event.stopPropagation();
    this.props.executeCommand(R.pick(['command', 'dir', 'id']));
  }

  onClickKill(event) {
    event.stopPropagation();
    this.props.killCommand(this.props.id);
  }

  onClickFinished(event) {
    event.stopPropagation();
    this.props.viewCommandOutput(this.props.id);
  }

  onClickFailed(event) {
    event.stopPropagation();
    alert(this.props.failedCommand);
  }

  onClickProgress(event) {
    event.stopPropagation();
    alert(this.props.runningCommand.stdout);
  }

  renderButtons() {
    const running = !!this.props.runningCommand;
    const finished = !!this.props.finishedCommand;
    const failed = !!this.props.failedCommand;
    const buttons = [];
    running && buttons.push(
      <Button key='pause' icon='pause' onClick={this.onClickKill} />
    );
    !running && buttons.push(
      <Button key='play' icon='play' onClick={this.onClickExecute} />
    );
    running && buttons.push(
      <Button key='progress' icon='spinner' onClick={this.onClickProgress} />
    );
    failed && buttons.push(
      <Button key='failed' icon='exclamation-triangle' onClick={this.onClickFailed} />
    );
    finished && buttons.push(
      <Button key='finished' icon='check' onClick={this.onClickFinished} />
    );
    return buttons;
  }

  render() {
    const className = cx({
      running: !!this.props.runningCommand
    });
    return (
      <li className={className}>
        <span>{this.props.command}</span>
        {this.renderButtons()}
      </li>
    );
  }
};
