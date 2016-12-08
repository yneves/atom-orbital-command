'use babel';

import React, { PropTypes, Component } from 'react';
import {parse as parseUrl} from 'url';

export default class BrowserIcon extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  };

  getSrc() {
    if (this.props.icon) {
      return this.props.icon;
    }
    const {hostname} = parseUrl(this.props.url);
    return `http://www.google.com/s2/favicons?domain=${hostname}`;
  }

  render() {
    return (
      <img
        className='orbital-command__browser-icon'
        src={this.getSrc()}
      />
    );
  }
};
