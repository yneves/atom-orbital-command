'use babel';

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';
import BrowserTab from './BrowserTab';
import BrowserIcon from './BrowserIcon';

export default class Browser extends Component {

  static propTypes = {
    browserTabs: PropTypes.array.isRequired,
    browserIcons: PropTypes.object.isRequired,
    setBrowserIcon: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._heading = {};
    this._content = {};
  }

  componentWillReceiveProps(nextProps) {
    const ids = R.map(R.prop('id'), this.props.browserTabs);
    const nextIds = R.map(R.prop('id'), nextProps.browserTabs);
    R.difference(ids, nextIds).forEach(id => {
      if (this._heading[id]) {
        ReactDOM.unmountComponentAtNode(this._heading[id]);
        delete this._heading[id];
      }
      if (this._content[id]) {
        ReactDOM.unmountComponentAtNode(this._content[id]);
        delete this._content[id];
      }
    });
  }

  getTabHeading(id) {
    if (!this._heading[id]) {
      this._heading[id] = document.querySelectorAll(`[data-path="${id}"]`)[0];
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
        <BrowserTab
          {...browserTab}
          setBrowserIcon={this.props.setBrowserIcon}
        />
      );
      ReactDOM.render(element, target);
    }
  }

  renderBrowserIcon(browserTab, index) {
    const target = this.getTabHeading(browserTab.id);
    if (target) {
      const element = (
        <BrowserIcon
          {...browserTab}
          icon={this.props.browserIcons[browserTab.id]}
        />
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
