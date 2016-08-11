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
    gitCheckout: PropTypes.func.isRequired,
    setCommitMessage: PropTypes.func.isRequired,
    setCheckoutBranch: PropTypes.func.isRequired,
    repositoryId: PropTypes.string.isRequired,
    repositoryBranch: PropTypes.array.isRequired,
  };

  state = {
    index: -1,
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
        if (index > -1) {
          this.props.gitCheckout(repositoryId, repositoryBranch[index]);
        } else if (/\w/.test(checkoutBranch)) {
          this.props.gitCheckout(repositoryId, checkoutBranch);
        }
        break;
      case KEY_ARROW_UP:
        this.setState({
          index: Math.max(index - 1, 0)
        });
        break;
      case KEY_ARROW_DOWN:
        this.setState({
          index: Math.min(index + 1, repositoryBranch.length - 1)
        });
        break;
      case KEY_ESC:
        this.refs.input.blur();
        break;
      default:
        if (index > -1) {
          this.setState({
            index: -1
          });
        }
        break;
    }
  }

  onChange() {
    this.props.setCheckoutBranch(this.props.repositoryId,
      this.refs.input.value);
  }

  onFocus() {
    this.refs.input.select();
    this.setState({
      index: this.props.repositoryBranch.indexOf(this.props.checkoutBranch),
      focused: true
    });
  }

  onBlur() {
    this.setState({
      index: -1,
      focused: false
    });
  }

  renderOption(branch, index) {
    return (
      <li
        key={index}
        data-text={branch}
        className={index === this.state.index ? 'selected' : ''}>
        {branch}
      </li>
    );
  }

  render() {
    const {checkoutBranch, repositoryId, repositoryBranch} = this.props;
    const listId = 'branches' + repositoryId.replace(/[^\w]/g,'');
    const filterText = checkoutBranch.length > 2 ? checkoutBranch : '';
    return (
      <div className="auto-complete">
        <input
          ref='input'
          type='text'
          value={checkoutBranch}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className='native-key-bindings'
          placeholder='Branch name...'
        />
        <style>
        {`#${listId} li {display: none;}
          #${listId} li[data-text*="${filterText}"] {display: block;}`}
        </style>
        <ul id={listId} style={{display: this.state.focused ? 'block': 'none'}}>
          {repositoryBranch.map(this.renderOption)}
        </ul>
      </div>
    );
  }
};
