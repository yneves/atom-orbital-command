'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import CommandInput from './CommandInput';
import Command from './Command';

export default class Commands extends Component {
  static propTypes = {
    repositoryId: PropTypes.string.isRequired,
    executeCommand: PropTypes.func.isRequired,
    killCommand: PropTypes.func.isRequired,
    editFile: PropTypes.func.isRequired,
    commands: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderCommand(command) {
    return (
      <Command
        key={command.input}
        command={command}
        editFile={this.props.editFile}
        killCommand={this.props.killCommand}
        executeCommand={this.props.executeCommand} />
    );
  }

  render() {
    return (
      <ul>
        {Object.values(this.props.commands).map(this.renderCommand)}
        <CommandInput
          repositoryId={this.props.repositoryId}
          executeCommand={this.props.executeCommand}
        />
      </ul>
    );
  }
}
