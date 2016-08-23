'use babel';

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';
import BrowserTab from './BrowserTab';
import BrowserIcon from './BrowserIcon';

export default class App extends Component {

  static propTypes = {
    browserTabs: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this._heading = {};
    this._content = {};
  }

  componentWillReceiveProps(nextProps) {
    const ids = R.map(R.prop('id'), nextProps.browserTabs);
    this._heading = R.pick(ids, this._heading);
    this._content = R.pick(ids, this._content);
  }

  getTabHeading(id) {
    if (!this._heading[id]) {
      const tab = document.querySelectorAll(`[data-path="${id}"]`)[0];
      if (tab) {
        tab.parentNode.classList.add('chloe__browser-tab__heading');
        this._heading[id] = tab;
      }
    }
    return this._heading[id];
  }

  getTabContent(id) {
    if (!this._content[id]) {
      this._content[id] = document.getElementById(id);
    }
    return this._content[id];
  }

  renderBrowserTab(browserTab) {
    const target = this.getTabContent(browserTab.id);
    if (target) {
      const element = (
        <BrowserTab {...browserTab} />
      );
      ReactDOM.render(element, target);
    }
  }

  renderBrowserIcon(browserTab, index) {
    const target = this.getTabHeading(browserTab.id);
    if (target) {
      const element = (
        <BrowserIcon {...browserTab} />
      );
      ReactDOM.render(element, target);
    }
  }

  render() {
    this.props.browserTabs.forEach(this.renderBrowserTab, this);
    this.props.browserTabs.forEach(this.renderBrowserIcon, this);
    return null;
  }
};
