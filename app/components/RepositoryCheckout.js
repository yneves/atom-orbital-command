'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import {
  KEY_ESC,
  KEY_ENTER,
  KEY_ARROW_UP,
  KEY_ARROW_DOWN
} from '../constants/keyCodes';


export default class RepositoryBranch extends Component {

  static propTypes = {
    runningGit: PropTypes.string,
    checkoutBranch: PropTypes.string.isRequired,
    currentBranch: PropTypes.string.isRequired,
    gitCheckout: PropTypes.func.isRequired,
    setCommitMessage: PropTypes.func.isRequired,
    setCheckoutBranch: PropTypes.func.isRequired,
    repositoryId: PropTypes.string.isRequired,
    repositoryBranch: PropTypes.array.isRequired,
  };

  state = {
    focused: false
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.refs.input.addEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(event) {
    const {checkoutBranch, repositoryId, repositoryBranch} = this.props;
    const {index} = this.state;
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
    const {currentBranch, checkoutBranch, repositoryBranch} = this.props;
    this.setState({
      focused: true
    });
  }

  onBlur() {
    this.setState({
      focused: false
    });
  }

  renderOption(branch, index) {
    return (
      <RepositoryBranch
        key={branch}
        branch={branch}
        gitCheckout={this.props.gitCheckout}
        repositoryId={this.props.repositoryId}
      />
    );
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

  shouldDisplayOptions() {
    return this.state.focused && !this.props.runningGit;
  }

  render() {
    const {checkoutBranch, repositoryId, repositoryBranch} = this.props;
    const listId = 'branches' + repositoryId.replace(/[^\w]/g,'');
    const listStyle = {display: this.shouldDisplayOptions() ? 'block': 'none'};
    const filterText = checkoutBranch.length > 2 ? checkoutBranch : '';
    return (
      <div className="auto-complete">
        {this.renderInput()}
        <style>
        {`#${listId} li {display: none;}
          #${listId} li[data-text*="${filterText}"] {display: block;}`}
        </style>
        <ul id={listId} style={listStyle}>
          {repositoryBranch.map(this.renderOption)}
        </ul>
      </div>
    );
  }
};
