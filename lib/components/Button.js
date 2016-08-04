'use babel';

import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import autoBind from 'class-autobind';

export default class Button extends Component {

  static propTypes = {
    icon: PropTypes.string.isRequired,
    spin: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClick(e) {
    e.stopPropagation();
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <button onClick={this.onClick} className={cx({
          active: this.props.active
        })}>
        <span className={cx({
            fa: true,
            ['fa-spin']: !!this.props.spin,
            ['fa-' + this.props.icon]: !!this.props.icon,
          })} />
      </button>
    );
  }
};
