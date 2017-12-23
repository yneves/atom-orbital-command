'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import lodash from 'lodash';
import RepositoryBranch from './RepositoryBranch';
import {
  KEY_ESC,
  KEY_ENTER,
} from '../constants/keyCodes';


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

  onKeyDown(e) {
    const { checkoutBranch, repositoryId } = this.props;
    switch (e.which) {
      case KEY_ENTER:
        if (/\w/.test(checkoutBranch)) {
          this.props.gitCheckout(repositoryId, checkoutBranch);
        }
        break;
      case KEY_ESC:
        e.target.blur();
        break;
      default:
        break;
    }
  }

  onChange(e) {
    this.props.setCheckoutBranch(
      this.props.repositoryId,
      e.target.value
    );
  }

  onFocus() {
    this.props.gitStatus(this.props.repositoryId);
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

  renderInput() {
    return (
      <input
        type='text'
        value={this.props.checkoutBranch}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        className='native-key-bindings'
        placeholder={this.props.currentBranch}
      />
    );
  }

  getBranches() {
    return lodash.uniq([
      this.props.currentBranch,
      this.props.defaultBranch,
    ].concat(this.props.checkoutHistory
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
