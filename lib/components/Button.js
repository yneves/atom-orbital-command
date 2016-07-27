'use babel';

import React, { PropTypes, Component } from 'react';

export default class Button extends Component {

  static propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
  };

  render() {
    return (
      <button onClick={this.props.onClick}>
        <span className={'fa fa-' + this.props.icon} />
      </button>
    );
  }
};
