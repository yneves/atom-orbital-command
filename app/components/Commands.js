'use babel';

import React, { PropTypes, Component } from 'react';
import Command from './Command';
import autoBind from 'class-autobind';

export default class Commands extends Component {

  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    section: PropTypes.string.isRequired,
    commands: PropTypes.array.isRequired,
    runningCommands: PropTypes.object.isRequired,
    finishedCommands: PropTypes.object.isRequired,
    failedCommands: PropTypes.object.isRequired,
    executeCommand: PropTypes.func.isRequired,
    killCommand: PropTypes.func.isRequired,
    viewCommandOutput: PropTypes.func.isRequired,
    editFile: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderCommand(command, index) {
    return (
      <Command
        key={index}
        runningCommand={this.props.runningCommands[command.id]}
        finishedCommand={this.props.finishedCommands[command.id]}
        failedCommand={this.props.failedCommands[command.id]}
        executeCommand={this.props.executeCommand}
        killCommand={this.props.killCommand}
        viewCommandOutput={this.props.viewCommandOutput}
        editFile={this.props.editFile}
        command={command}
      />
    );
  }

  filterCollapsed(command) {
    return !this.props.collapsed ||
      this.props.runningCommands[command.id];
  }

  onClickHeader() {
    this.props.toggleSection(this.props.section);
  }

  render() {
    return (
      <section>
        <header onClick={this.onClickHeader}>
          Commands
        </header>
        <ul>
          {this.props.commands
            .filter(this.filterCollapsed)
            .map(this.renderCommand, this)}
        </ul>
      </section>
    );
  }
}
