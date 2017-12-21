'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import Button from './Button';

export default class RepositoryLog extends Component {

  static propTypes = {
    commit: PropTypes.string.isRequired,
    latestCommit: PropTypes.bool.isRequired,
    repositoryId: PropTypes.string.isRequired,
    gitPush: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { copied: false };
  }

  onClickPush() {
    const { gitPush, repositoryId, latestCommit, commit } = this.props;
    gitPush(repositoryId, null, latestCommit ? null : commit);
  }

  render() {
    return (
      <li>
        <span>
          <i className='icon icon-git-commit' />
          {this.props.commit}
        </span>
        <Button icon='arrow-circle-up' onClick={this.onClickPush} />
      </li>
    );
  }
}
