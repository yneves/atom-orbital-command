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
    index: PropTypes.number.isRequired,
    setBrowserIcon: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.createWebview();
  }

  onFavIconUpdated(e) {
    this.props.setBrowserIcon(this.props.id, e.favicons[0]);
  }

  createWebview() {
    this.webView = document.createElement('webview');
    this.webView.src = this.props.url;
    this.refs.elm.appendChild(this.webView);
    this.webView.addEventListener('page-favicon-updated', this.onFavIconUpdated);
  }

  render() {
    return (
      <div className='chloe__browser-tab' ref='elm' />
    );
  }
};
