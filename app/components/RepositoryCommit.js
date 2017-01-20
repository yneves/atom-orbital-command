'use babel';

import React, { PropTypes, Component } from 'react';
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

  componentDidMount() {
    this.refs.input.addEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(event) {
    if (event.which === 13) {
      const message = this.props.commitMessage;
      if (/\w/.test(message)) {
        this.props.gitCommit(this.props.repositoryId, message);
      }
    }
  }

  onChange() {
    this.props.setCommitMessage(this.props.repositoryId, this.refs.input.value);
  }

  render() {
    return (
      <input
        ref='input'
        type='text'
        value={this.props.commitMessage}
        onChange={this.onChange}
        className='native-key-bindings'
        placeholder='Commit message...'
      />
    );
  }
}
