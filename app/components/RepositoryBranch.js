'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import Button from './Button';

export default class RepositoryBranch extends Component {

  static propTypes = {
    branch: PropTypes.string.isRequired,
    gitPull: PropTypes.func.isRequired,
    gitCheckout: PropTypes.func.isRequired,
    repositoryId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClickCheckout() {
    this.props.gitCheckout(this.props.repositoryId, this.props.branch);
  }

  onClickPull() {
    this.props.gitPull(this.props.repositoryId, this.props.branch);
  }

  render() {
    return (
      <li onClick={this.onClickCheckout} data-text={this.props.branch}>
        <i className='icon icon-git-branch' />
        {this.props.branch}
        <Button
          icon='arrow-circle-right'
          tooltip={`git checkout ${this.props.branch}`}
          onClick={this.onClickCheckout}
        />
        <Button
          icon='arrow-circle-down'
          tooltip={`git pull origin ${this.props.branch}`}
          onClick={this.onClickPull}
        />
      </li>
    );
  }

}
