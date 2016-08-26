'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import cx from 'classnames';
import Button from './Button';
import BrowserIcon from './BrowserIcon';

export default class Bookmark extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    openBookmark: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClick() {
    this.props.openBookmark(this.props.id, this.props.url);
  }

  render() {
    const className = cx({
    });
    return (
      <li onClick={this.onClick} className={className}>
        <BrowserIcon url={this.props.url} icon={this.props.icon} />
        {this.props.url}
      </li>
    );
  }
};
