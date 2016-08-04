'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import Button from './Button';

export default class RepositoryFile extends Component {

  static propTypes = {
    repositoryId: PropTypes.string.isRequired,
    commit: PropTypes.bool.isRequired,
    file: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onToggle() {
    const {repositoryId, file} = this.props;
    this.props.toggleRepositoryFile(repositoryId, file);
  }

  render() {
    return (
      <li className={this.props.status}>
        <input
          type='checkbox'
          checked={this.props.commit}
          onChange={this.onToggle}
        />
        <span>{this.props.file}</span>
      </li>
    );
  }
};
