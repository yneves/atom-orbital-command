'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import classNames from 'classnames';
import Button from './Button';

export default class RepositoryBranch extends Component {
  static propTypes = {
    branch: PropTypes.string.isRequired,
    gitPull: PropTypes.func.isRequired,
    gitCheckout: PropTypes.func.isRequired,
    gitStatus: PropTypes.func.isRequired,
    currentBranch: PropTypes.string.isRequired,
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

  onClickStatus() {
    this.props.gitStatus(this.props.repositoryId);
  }

  render() {
    const isSelected = this.props.branch === this.props.currentBranch;
    const className = classNames({
      selected: isSelected,
    });
    return (
      <li onClick={this.onClickCheckout} className={className}>
        <span>
          <i className='icon icon-git-branch' />
          {this.props.branch}
        </span>
        <Button
          icon='arrow-circle-down'
          tooltip={`git pull origin ${this.props.branch}`}
          onClick={this.onClickPull}
        />
        {isSelected && (
          <Button
            octicon='git-compare'
            tooltip={'git status'}
            onClick={this.onClickStatus}
          />
        )}
        {!isSelected && (
          <Button
            icon='arrow-circle-right'
            tooltip={`git checkout ${this.props.branch}`}
            onClick={this.onClickCheckout}
          />
        )}
      </li>
    );
  }
}
