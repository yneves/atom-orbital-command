'use babel';

import {CompositeDisposable} from 'atom';

const isURL = (url) => (/^http\:|^https\:/.test(url));

class BrowserView {
  constructor(element, browser) {
    this.element = element;
    this.browser = browser;
  }
  getURI() {
    return this.browser.id;
  }
  getPath() {
    return this.browser.id;
  }
  getTitle() {
    return '';
  }
  destroy() {
    this.element.remove();
  }
};

const createBrowserItem = (item) => {
  const element = document.createElement('div');
  element.id = item.id;
  element.className = 'orbital-command__browser';
  return new BrowserView(element, item);
};

const browserOpener = (uri, opts) => {
  if (isURL(uri)) {
    const pane = atom.workspace.paneForURI(opts.id);
    if (pane) {
      return pane.itemForURI(opts.id);
    }
    return createBrowserItem(opts);
  }
};

const browserEvent = (callback) => ({item}) => {
  if (item.browser) {
    setTimeout(() => callback(item.browser), 50);
  }
};

export default (onOpen, onClose) => {

  const disposable = new CompositeDisposable();
  disposable.add(atom.workspace.addOpener(browserOpener));
  disposable.add(atom.workspace.onDidAddPaneItem(browserEvent(onOpen)));
  disposable.add(atom.workspace.onWillDestroyPaneItem(browserEvent(onClose)));

  return disposable;
};
