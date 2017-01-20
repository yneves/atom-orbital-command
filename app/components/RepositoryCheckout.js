'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import RepositoryBranch from './RepositoryBranch';
import {
  KEY_ESC,
  KEY_ENTER,
  KEY_ARROW_UP,
  KEY_ARROW_DOWN,
} from '../constants/keyCodes';


export default class RepositoryCheckout extends Component {

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
    focused: false,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.refs.input.addEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(event) {
    const { checkoutBranch, repositoryId, repositoryBranch } = this.props;
    const { index } = this.state;
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
    const { currentBranch, checkoutBranch, repositoryBranch } = this.props;
    this.setState({
      focused: true,
    });
  }

  onBlur() {
    this.setState({
      focused: false,
    });
  }

  onMouseEnter() {
    this.setState({
      hovering: true,
    });
  }

  onMouseLeave() {
    this.setState({
      hovering: false,
    });
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

  getListId() {
    return `branches${this.props.repositoryId.replace(/[^\w]/g, '')}`;
  }

  getListStyle() {
    return {
      display: this.shouldDisplayOptions() ? 'block' : 'none',
    };
  }

  getFilter() {
    return this.props.checkoutBranch.length > 2
      ? this.props.checkoutBranch : '';
  }

  shouldDisplayOptions() {
    return !this.props.runningGit && (
      this.state.focused || this.state.hovering
    );
  }

  renderBranches() {
    return (
      <ul id={this.getListId()} style={this.getListStyle()}>
        {this.props.repositoryBranch.map(this.renderBranch)}
      </ul>
    );
  }

  renderBranch(branch, index) {
    return (
      <RepositoryBranch
        key={branch}
        branch={branch}
        gitCheckout={this.props.gitCheckout}
        repositoryId={this.props.repositoryId}
      />
    );
  }

  renderStyle() {
    const listId = this.getListId();
    const filterText = this.getFilter();
    return (
      <style>
      {`#${listId} li {display: none;}
        #${listId} li[data-text*="${filterText}"] {display: block;}`}
      </style>
    );
  }

  render() {
    return (
      <div className="auto-complete"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        {this.renderInput()}
        {this.renderBranches()}
        {this.renderStyle()}
      </div>
    );
  }
}
