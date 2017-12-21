'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import RepositoryBranch from './RepositoryBranch';
import {
  KEY_ESC,
  KEY_ENTER,
} from '../constants/keyCodes';


export default class RepositoryCheckout extends Component {

  static propTypes = {
    runningGit: PropTypes.string,
    checkoutBranch: PropTypes.string.isRequired,
    checkoutHistory: PropTypes.array.isRequired,
    currentBranch: PropTypes.string.isRequired,
    gitCheckout: PropTypes.func.isRequired,
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

  componentDidMount() {
    this.refs.input.addEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(event) {
    const { checkoutBranch, repositoryId } = this.props;
    switch (event.which) {
      case KEY_ENTER:
        if (/\w/.test(checkoutBranch)) {
          this.props.gitCheckout(repositoryId, checkoutBranch);
        }
        break;
      case KEY_ESC:
        this.refs.input.blur();
        break;
      default:
        break;
    }
  }

  onChange() {
    this.props.setCheckoutBranch(this.props.repositoryId,
      this.refs.input.value);
  }

  onFocus() {
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
        ref='input'
        type='text'
        value={this.props.checkoutBranch}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        className='native-key-bindings'
        placeholder={this.props.currentBranch}
      />
    );
  }

  renderBranches() {
    return this.state.isFocused && (
      <ul>
        {this.props.checkoutHistory.map(this.renderBranch)}
      </ul>
    );
  }

  renderBranch(branch) {
    return (
      <RepositoryBranch
        key={branch}
        branch={branch}
        gitPull={this.props.gitPull}
        gitCheckout={this.props.gitCheckout}
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
