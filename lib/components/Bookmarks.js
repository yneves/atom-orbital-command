'use babel';

import React, { PropTypes, Component } from 'react';
import R from 'ramda';
import Bookmark from './Bookmark';
import autoBind from 'class-autobind';

export default class Bookmarks extends Component {

  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    section: PropTypes.string.isRequired,
    bookmarks: PropTypes.array.isRequired,
    openBookmark: PropTypes.func.isRequired,
    toggleSection: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderBookmark(bookmark, index) {
    return (
      <Bookmark
        key={index}
        {...bookmark}
        openBookmark={this.props.openBookmark}
      />
    );
  }

  filterCollapsed(bookmark) {
    return !this.props.collapsed;
  }

  onClickHeader() {
    this.props.toggleSection(this.props.section);
  }

  render() {
    return (
      <section>
        <header onClick={this.onClickHeader}>
          Bookmarks
        </header>
        <ul>
          {this.props.bookmarks
            .filter(this.filterCollapsed)
            .map(this.renderBookmark, this)}
        </ul>
      </section>
    );
  }
};
