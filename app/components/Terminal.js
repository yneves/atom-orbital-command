'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import path from 'path';
import Commands from './Commands';

export default class Terminal extends Component {
  static propTypes = {
    toggleSection: PropTypes.func.isRequired,
    executeCommand: PropTypes.func.isRequired,
    removeCommand: PropTypes.func.isRequired,
    selectCommand: PropTypes.func.isRequired,
    killCommand: PropTypes.func.isRequired,
    setCommandInput: PropTypes.func.isRequired,
    editFile: PropTypes.func.isRequired,
    commandInput: PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
    selectedCommands: PropTypes.object.isRequired,
    commands: PropTypes.object.isRequired,
    collapsedSections: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  getSectionName() {
    return `terminal:${this.props.repository}`;
  }

  isCollapsed() {
    return this.props.collapsedSections.includes(this.getSectionName());
  }

  onClickHeader() {
    this.props.toggleSection(this.getSectionName());
  }

  renderCommands() {
    return (
      <Commands
        repositoryId={this.props.repository}
        commands={this.props.commands}
        commandInput={this.props.commandInput}
        setCommandInput={this.props.setCommandInput}
        selectedCommands={this.props.selectedCommands}
        editFile={this.props.editFile}
        removeCommand={this.props.removeCommand}
        selectCommand={this.props.selectCommand}
        executeCommand={this.props.executeCommand}
        killCommand={this.props.killCommand} />
    );
  }

  render() {
    return (
      <section>
        <header onClick={this.onClickHeader}>
          <span>
            <i className='fa fa-terminal' />
            {path.basename(this.props.repository)}
          </span>
        </header>
        {this.isCollapsed() || this.renderCommands()}
      </section>
    );
  }
}
