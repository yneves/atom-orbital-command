'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';

export default class RepositoryCommit extends Component {
  static propTypes = {
    commitMessage: PropTypes.string.isRequired,
    gitCommit: PropTypes.func.isRequired,
    setCommitMessage: PropTypes.func.isRequired,
    repositoryId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onKeyDown(event) {
    if (event.which === 13) {
      const message = this.props.commitMessage;
      if (/\w/.test(message)) {
        this.props.gitCommit(this.props.repositoryId, message);
      }
    }
  }

  onChange(e) {
    this.props.setCommitMessage(this.props.repositoryId, e.target.value);
  }

  render() {
    return (
      <input
        type='text'
        value={this.props.commitMessage}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        className='native-key-bindings'
        placeholder='Commit message...'
      />
    );
  }
}
