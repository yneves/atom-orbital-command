'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'class-autobind';
import classNames from 'classnames';
import Button from './Button';

export default class RepositoryLog extends Component {
  static propTypes = {
    commit: PropTypes.string.isRequired,
    isLatestCommit: PropTypes.bool.isRequired,
    repositoryId: PropTypes.string.isRequired,
    gitPush: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClickPush() {
    this.props.gitPush(this.props.repositoryId, null, null);
  }

  render() {
    const className = classNames({
      highlighted: this.props.isLatestCommit,
    });
    return (
      <li className={className}>
        <span>
          <i className='icon icon-git-commit' />
          {this.props.commit}
        </span>
        {this.props.isLatestCommit && (
          <Button
            icon='arrow-circle-up'
            onClick={this.onClickPush} />
        )}
      </li>
    );
  }
}
