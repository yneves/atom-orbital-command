'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';

export default class RepositoryBranch extends Component {

  static propTypes = {
    gitCheckout: PropTypes.func.isRequired,
    setCommitMessage: PropTypes.func.isRequired,
    setCheckoutBranch: PropTypes.func.isRequired,
    repositoryId: PropTypes.string.isRequired,
    repositoryBranch: PropTypes.array.isRequired,
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
      const branch = this.props.checkoutBranch;
      if (/\w/.test(branch)) {
        this.props.gitCheckout(this.props.repositoryId, branch);
      }
    }
  }

  onChange() {
    this.props.setCheckoutBranch(this.props.repositoryId,
      this.refs.input.value);
  }

  onFocus() {
    this.refs.input.select();
  }

  render() {
    return (
      <div>
        <input
          ref='input'
          type='text'
          value={this.props.checkoutBranch}
          onChange={this.onChange}
          onFocus={this.onFocus}
          className='native-key-bindings'
          placeholder='Branch name...'
        />
      </div>
    );
  }
};
