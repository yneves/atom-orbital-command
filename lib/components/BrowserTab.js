'use babel';

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import autoBind from 'class-autobind';
import BrowserIcon from './BrowserIcon';

export default class BrowserTab extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.createWebview();
  }

  createWebview() {
    const webView = document.createElement('webview');
    webView.src = this.props.url;
    this.refs.elm.appendChild(webView);
  }

  render() {
    return (
      <div className='chloe__browser-tab' ref='elm' />
    );
  }
};
