'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import autoBind from 'class-autobind';

export default class Button extends Component {
  static propTypes = {
    icon: PropTypes.string,
    octicon: PropTypes.string,
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
      fa: !this.props.octicon,
      'fa-spin': !this.props.octicon && !!this.props.spin,
      [`fa-${this.props.icon}`]: !this.props.octicon && !!this.props.icon,
      icon: !!this.props.octicon,
      [`icon-${this.props.octicon}`]: !!this.props.octicon,
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
