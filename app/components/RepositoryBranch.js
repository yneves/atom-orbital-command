'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';

export default class RepositoryBranch extends Component {

  static propTypes = {
    branch: PropTypes.string.isRequired,
    gitCheckout: PropTypes.func.isRequired,
    repositoryId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClick() {
    this.props.gitCheckout(this.props.repositoryId, this.props.branch);
  }

  render() {
    return (
      <li onClick={this.onClick} data-text={this.props.branch}>
        {this.props.branch}
      </li>
    );
  }

};
