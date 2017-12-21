'use babel';

import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import autoBind from 'class-autobind';

export default class Button extends Component {

  static propTypes = {
    icon: PropTypes.string.isRequired,
    oct: PropTypes.bool,
    spin: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string,
    tooltip: PropTypes.string,
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClick(e) {
    e.stopPropagation();
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const classNameButton = cx({
      active: this.props.active,
      [this.props.className]: !!this.props.className,
    });
    const classNameIcon = cx({
      fa: !this.props.oct,
      'fa-spin': !this.props.oct && !!this.props.spin,
      [`fa-${this.props.icon}`]: !this.props.oct && !!this.props.icon,
      icon: this.props.oct,
      [`icon-${this.props.icon}`]: this.props.oct,
    });
    return (
      <button
        title={this.props.tooltip}
        onClick={this.onClick}
        className={classNameButton}>
        <span className={classNameIcon} />
      </button>
    );
  }
}
