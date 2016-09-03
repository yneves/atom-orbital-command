'use babel';

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';
import TerminalIcon from './TerminalIcon';

export default class Terminal extends Component {

  static propTypes = {
    terminalTabs: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this._heading = {};
  }

  componentWillReceiveProps(nextProps) {
    const ids = R.map(R.prop('id'), this.props.terminalTabs);
    const nextIds = R.map(R.prop('id'), nextProps.terminalTabs);
    R.difference(ids, nextIds).forEach(id => {
      if (this._heading[id]) {
        ReactDOM.unmountComponentAtNode(this._heading[id]);
        delete this._heading[id];
      }
    });
  }

  getTabHeading(id) {
    if (!this._heading[id]) {
      this._heading[id] = document.querySelectorAll(`[data-path="${id}"]`)[0];
    }
    return this._heading[id];
  }

  renderTerminalIcon(terminalTab, index) {
    const target = this.getTabHeading(terminalTab.id);
    if (target) {
      const element = (
        <TerminalIcon
          {...terminalTab}
        />
      );
      ReactDOM.render(element, target);
    }
  }

  render() {
    this.props.terminalTabs.forEach(this.renderTerminalIcon, this);
    return null;
  }
};
