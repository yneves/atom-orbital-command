'use babel';

import React, { PropTypes, Component } from 'react';
import R from 'ramda';
import autoBind from 'class-autobind';

export default class RepositoryCommit extends Component {

  static propTypes = {
    repositoryId: PropTypes.string.isRequired,
    gitCommit: PropTypes.func.isRequired,
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
      const message = this.refs.input.value;
      if (/\w/.test(message)) {
        this.props.gitCommit(this.props.repositoryId, message);
      }
    }
  }

  render() {
    return (
      <input
        ref='input'
        type='text'
        defaultValue=''
        className='native-key-bindings'
        placeholder='Commit message...'
      />
    );
  }
};
