'use babel';

import {CompositeDisposable} from 'atom';

const isURL = (url) => (/^http\:|^https\:/.test(url));

const createBrowserItem = (opts) => {
  const element = document.createElement('div');
  element.id = opts.id;
  element.className = 'chloe__browser';
  return {
    element,
    browser: opts,
    getURI: () => opts.id,
    getPath: () => opts.id,
    getTitle: () => '',
    destroy: () => element.remove()
  };
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
