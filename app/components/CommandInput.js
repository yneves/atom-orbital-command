'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';

export default class CommandInput extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    executeCommand: PropTypes.func.isRequired,
    setCommandInput: PropTypes.func.isRequired,
    commandInput: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onKeyPress(e) {
    if (e.which === 13) {
      if (/\w/.test(this.props.commandInput)) {
        this.props.executeCommand(this.props.repository, this.props.commandInput);
      }
    }
  }

  onChange(e) {
    this.props.setCommandInput(this.props.repository, e.target.value);
  }

  render() {
    return (
      <input
        type='text'
        value={this.props.commandInput}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        className='native-key-bindings'
        placeholder='$'
      />
    );
  }
}
