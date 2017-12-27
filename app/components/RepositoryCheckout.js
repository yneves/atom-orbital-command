'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import lodash from 'lodash';
import RepositoryBranch from './RepositoryBranch';

export default class RepositoryCheckout extends Component {
  static propTypes = {
    runningGit: PropTypes.string,
    defaultBranch: PropTypes.string.isRequired,
    checkoutBranch: PropTypes.string.isRequired,
    checkoutHistory: PropTypes.array.isRequired,
    currentBranch: PropTypes.string.isRequired,
    gitCheckout: PropTypes.func.isRequired,
    gitStatus: PropTypes.func.isRequired,
    gitPull: PropTypes.func.isRequired,
    setCommitMessage: PropTypes.func.isRequired,
    setCheckoutBranch: PropTypes.func.isRequired,
    repositoryId: PropTypes.string.isRequired,
    repositoryBranch: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isFocused: false,
    };
  }

  onChange(e) {
    this.props.setCheckoutBranch(
      this.props.repositoryId,
      e.target.value
    );
  }

  onFocus() {
    if (!this.props.checkoutBranch) {
      this.props.gitStatus(this.props.repositoryId);
    }
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
      this.blurTimeout = undefined;
    }
    this.setState({
      isFocused: true,
    });
  }

  onBlur() {
    this.blurTimeout = setTimeout(() => {
      this.setState({
        isFocused: false,
      });
    }, 100);
  }

  onKeyPress(event) {
    if (event.which === 13 && /\w/.test(this.props.checkoutBranch)) {
      this.props.gitCheckout(this.props.repositoryId, this.props.checkoutBranch);
    }
  }

  renderInput() {
    return (
      <input
        type='text'
        value={this.props.checkoutBranch}
        onKeyPress={this.onKeyPress}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        className='native-key-bindings'
        placeholder={this.props.currentBranch}
      />
    );
  }

  getBranches() {
    const branches = [
      this.props.currentBranch,
      this.props.defaultBranch,
    ];
    if (!this.props.checkoutBranch) {
      return lodash.uniq(branches);
    }
    return lodash.uniq(branches.concat(this.props.checkoutHistory
      .concat(this.props.repositoryBranch)
      .filter(branch => lodash.startsWith(branch, this.props.checkoutBranch))));
  }

  renderBranches() {
    return this.state.isFocused && (
      <ul className='scroll'>
        {this.getBranches().map(this.renderBranch)}
      </ul>
    );
  }

  renderBranch(branch) {
    return (
      <RepositoryBranch
        key={branch}
        branch={branch}
        currentBranch={this.props.currentBranch}
        gitPull={this.props.gitPull}
        gitCheckout={this.props.gitCheckout}
        gitStatus={this.props.gitStatus}
        repositoryId={this.props.repositoryId}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderInput()}
        {this.renderBranches()}
      </div>
    );
  }
}
