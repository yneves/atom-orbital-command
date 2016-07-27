'use babel';

import React, { PropTypes, Component } from 'react';
import Command from './Command';

export default class Commands extends Component {

  static propTypes = {
    commands: PropTypes.array.isRequired,
    runningCommands: PropTypes.object.isRequired,
    finishedCommands: PropTypes.object.isRequired,
    failedCommands: PropTypes.object.isRequired,
    executeCommand: PropTypes.func.isRequired,
    killCommand: PropTypes.func.isRequired,
  };

  renderCommand(command, index) {
    return (
      <Command
        key={index}
        runningCommand={this.props.runningCommands[command.id]}
        finishedCommand={this.props.finishedCommands[command.id]}
        failedCommand={this.props.failedCommands[command.id]}
        executeCommand={this.props.executeCommand}
        killCommand={this.props.killCommand}
        {...command}
      />
    );
  }

  render() {
    return (
      <section>
        <header>
          Commands
        </header>
        <ul>
          {this.props.commands.map(this.renderCommand, this)}
        </ul>
      </section>
    );
  }
};
