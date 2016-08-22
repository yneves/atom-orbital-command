'use babel';

import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import autoBind from 'class-autobind';

export default class BrowserTab extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const webView = document.createElement('webview');
    webView.src = this.props.url;
    this.refs.elm.appendChild(webView);
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div className='chloe__browser-tab' ref='elm' />
    );
  }
};
