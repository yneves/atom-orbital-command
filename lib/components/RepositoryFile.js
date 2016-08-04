'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import Button from './Button';

export default class RepositoryFile extends Component {

  static propTypes = {
    file: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <li className={this.props.status}>
        {this.props.file}
      </li>
    );
  }
};
