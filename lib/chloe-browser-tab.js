'use babel';

import autoBind from 'class-autobind';

export default class ChloeBrowserTab {

  constructor(props, browser) {
    autoBind(this);
    this.id = props.id;
    this.url = props.url;
    this.name = props.name;
    this.browser = browser;
  }

  set(props) {
    for (let prop in props) {
      this[prop] = props[prop];
    }
  }

  open() {
    return this.browser.driver
      .newTab(this.url)
      .then(tab => {
        this.id = tab.id
      });
  }

  close() {
    return this.browser.driver
      .close(this.id)
      .then(() => {
        this.id = undefined
      });
  }

  focus() {
    return this.browser.driver
      .window(this.id);
  }
}
