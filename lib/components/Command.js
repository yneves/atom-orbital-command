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

  onClickExecute() {
    this.props.executeCommand(R.pick(['command', 'dir', 'id'], this.props));
  }

  onClickKill() {
    this.props.killCommand(this.props.id);
  }

  onClickFinished() {
    this.props.viewCommandOutput(this.props.id);
  }

  onClickFailed() {
    this.props.viewCommandOutput(this.props.id);
  }

  onClickProgress() {
    this.props.viewCommandOutput(this.props.id);
  }

  renderButtons() {
    const running = !!this.props.runningCommand;
    const finished = !!this.props.finishedCommand;
    const failed = !!this.props.failedCommand;
    const buttons = [];
    if (running) {
      buttons.push(
        <Button key='pause' icon='pause' onClick={this.onClickKill} />
      );
    }
    if (!running) {
      buttons.push(
        <Button key='play' icon='play' onClick={this.onClickExecute} />
      );
    }
    if (running) {
      buttons.push(
        <Button key='progress' icon='spinner' spin onClick={this.onClickProgress} />
      );
    }
    if (failed) {
      buttons.push(
        <Button key='failed' icon='exclamation-triangle' onClick={this.onClickFailed} />
      );
    }
    if (finished) {
      buttons.push(
        <Button key='finished' icon='check' onClick={this.onClickFinished} />
      );
    }
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
