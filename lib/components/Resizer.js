'use babel';

import React, { PropTypes, Component } from 'react';
import autoBind from 'class-autobind';

export default class App extends Component {

  static propTypes = {
  };

  render() {
    return (
      <div className='chloe__resizer'
        onMouseDown={this.onMouseDown}>

      </div>
    );
  }
};
