'use babel';

import React, { PropTypes, Component } from 'react';
import {parse as parseUrl} from 'url';

export default class BrowserIcon extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  render() {
    const {hostname} = parseUrl(this.props.url);
    const src = `http://www.google.com/s2/favicons?domain=${hostname}`;
    return (
      <img className='chloe__browser-icon' src={src} />
    );
  }
};
