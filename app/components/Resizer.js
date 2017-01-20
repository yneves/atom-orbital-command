'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';

export default class App extends Component {

  static propTypes = {
    element: PropTypes.object.isRequired,
    resizeRightPanel: PropTypes.func.isRequired,
    rightPanelWidth: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.element.style.width = `${this.props.rightPanelWidth}px`;
  }

  onMouseDown(event) {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    this.setState({ start: event.pageX });
  }

  onMouseMove(event) {
    const { start } = this.state;
    const width = this.props.rightPanelWidth;
    if (start) {
      this.props.element.style.width = `${width + start - event.pageX}px`;
    }
  }

  onMouseUp() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.setState({ start: undefined });
    const width = parseInt(this.props.element.style.width, 10);
    this.props.resizeRightPanel(width);
  }

  render() {
    return (
      <div className='orbital-command__resizer' onMouseDown={this.onMouseDown} />
    );
  }
}
