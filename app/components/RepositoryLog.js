'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import classNames from 'classnames';
import Button from './Button';

export default class RepositoryLog extends Component {

  static propTypes = {
    commit: PropTypes.string.isRequired,
    repositoryId: PropTypes.string.isRequired,
    gitPush: PropTypes.func.isRequired,
    clipboardCopy: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { copied: false };
  }

  onClickPush() {
    this.props.gitPush(this.props.repositoryId, null, this.props.commit);
  }

  onClipboardCopy() {
    this.props.clipboardCopy(this.props.commit);
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 600);
  }

  render() {
    const clipboardClassName = classNames({
      'clipboard-copy': true,
      'clipboard-copied': this.state.copied,
    });
    return (
      <li>
        <Button icon='arrow-circle-up' onClick={this.onClickPush} />
        <span className={clipboardClassName} onClick={this.onClipboardCopy}>
          {this.props.commit}
        </span>
      </li>
    );
  }
}
