'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';

export default class CommandInput extends Component {
  static propTypes = {
    repositoryId: PropTypes.string.isRequired,
    executeCommand: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onKeyPress(e) {
    if (e.which === 13) {
      if (/\w/.test(e.target.value)) {
        this.props.executeCommand(this.props.repositoryId, e.target.value);
        e.target.value = '';
      }
    }
  }

  render() {
    return (
      <input
        type='text'
        onKeyPress={this.onKeyPress}
        className='native-key-bindings'
        placeholder='$'
      />
    );
  }
}
