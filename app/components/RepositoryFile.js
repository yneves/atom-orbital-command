'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';
import Button from './Button';

export default class RepositoryFile extends Component {

  static propTypes = {
    repositoryId: PropTypes.string.isRequired,
    commit: PropTypes.bool.isRequired,
    file: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    editFile: PropTypes.func.isRequired,
    toggleCommitFile: PropTypes.func.isRequired,
    branch: PropTypes.string,
    removeFile: PropTypes.func.isRequired,
    gitCheckout: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onToggle() {
    const { repositoryId, file } = this.props;
    this.props.toggleCommitFile(repositoryId, file);
  }

  onClickFile() {
    this.props.editFile(this.props.path);
  }

  onClickUndo() {
    const { repositoryId, branch, file, path } = this.props;
    if (this.props.status === 'new') {
      this.props.removeFile(path);
    } else {
      this.props.gitCheckout(repositoryId, branch, file);
    }
  }

  render() {
    return (
      <li className={this.props.status}>
        <input
          type='checkbox'
          checked={this.props.checked}
          onChange={this.onToggle}
        />
        <span onClick={this.onClickFile}>{this.props.file}</span>
        <Button icon='undo' onClick={this.onClickUndo} />
      </li>
    );
  }
}
