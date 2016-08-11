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
    this.setState({ focused: true });
  }

  onBlur() {
    this.setState({ focused: false });
  }

  renderOption(branch, index) {
    return (
      <li key={index} data-text={branch}>
        {branch}
      </li>
    );
  }

  render() {
    const {checkoutBranch, repositoryId, repositoryBranch} = this.props;
    const listId = 'branches' + repositoryId.replace(/[^\w]/g,'');
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
          #${listId} li[data-text*="${checkoutBranch}"] {display: block;}`}
        </style>
        <ul id={listId} style={{display: this.state.focused ? 'block': 'none'}}>
          {repositoryBranch.map(this.renderOption)}
        </ul>
      </div>
    );
  }
};
