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
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  getCommand() {
    return R.pick(['command', 'dir', 'id', 'runningCommand'], this.props);
  }

  onClickExecute(event) {
    event.stopPropagation();
    this.props.executeCommand(this.getCommand());
  }

  onClickKill(event) {
    event.stopPropagation();
    this.props.killCommand(this.getCommand());
  }

  onClickFinished(event) {
    event.stopPropagation();
    alert(this.props.finishedCommand);
  }

  onClickFailed(event) {
    event.stopPropagation();
    alert(this.props.failedCommand);
  }

  render() {
    const running = !!this.props.runningCommand;
    const finished = !!this.props.finishedCommand;
    const failed = !!this.props.failedCommand;
    const className = cx({
      running,
    });
    return (
      <li className={className}>
        <span>{this.props.command}</span>
        <Button
          icon={running ? 'pause' : 'play'}
          onClick={running ? this.onClickKill : this.onClickExecute}
        />
        {(finished || failed) && (
          <Button
            icon={finished ? 'check' : 'exclamation-triangle'}
            onClick={finished ? this.onClickFinished : this.onClickFailed}
          />
        )}
      </li>
    );
  }
};
