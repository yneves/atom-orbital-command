'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import Button from './Button';

export default class RepositoryLog extends Component {

  static propTypes = {
    commit: PropTypes.string.isRequired,
    repositoryId: PropTypes.string.isRequired,
    gitPush: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClickPush() {
    this.props.gitPush(this.props.repositoryId, null, this.props.commit);
  }

  render() {
    return (
      <li>
        <Button icon='arrow-circle-up' onClick={this.onClickPush} />
        <span>
          {this.props.commit}
        </span>
      </li>
    );
  }

};
