'use babel';

import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

export default class Button extends Component {

  static propTypes = {
    icon: PropTypes.string.isRequired,
    spin: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func
  };

  render() {
    return (
      <button onClick={this.props.onClick}>
        <span className={cx({
            fa: true,
            ['fa-spin']: !!this.props.spin,
            ['fa-' + this.props.icon]: !!this.props.icon,
          })} />
      </button>
    );
  }
};
