'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import CommandInput from './CommandInput';

export default class Commands extends Component {
  static propTypes = {
    repositoryId: PropTypes.string.isRequired,
    executeCommand: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <ul>
        <CommandInput
          repositoryId={this.props.repositoryId}
          executeCommand={this.props.executeCommand}
/>
      </ul>
    );
  }
}
