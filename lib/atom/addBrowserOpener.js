'use babel';

const isURL = (url) => (/^http\:|^https\:/.test(url));

const createBrowserItem = (opts) => {
  const element = document.createElement('div');
  element.id = opts.id;
  element.className = 'chloe__browser';
  return {
    element,
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

export default () => {

  return atom.workspace.addOpener(browserOpener);
};
