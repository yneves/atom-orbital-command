'use babel';

import R from 'ramda';
import {CompositeDisposable} from 'atom';

const isTerminal = (uri) => (uri === '/TERMINAL');

const terminalOpener = (uri, opts) => {
  if (isTerminal(uri)) {
    const pane = atom.workspace.paneForURI(opts.id);
    if (pane) {
      return pane.itemForURI(opts.id);
    }
    return createTerminalItem(opts);
  }
};

const createTerminalItem = (opts) => {
  const packagePath = atom.packages.resolvePackagePath('term3');
  const term3 = require(packagePath);
  const item = term3.createTermView();
  item.getURI = () => opts.id;
  item.getPath = () => opts.id;
  item.terminal = opts;
  return item;
};

const terminalEvent = (callback) => ({item}) => {
  if (item.terminal) {
    setTimeout(() => {
      clearTreeList();
      callback(item.terminal);
    }, 50);
  }
};

const clearTreeList = () => {
  const elements = document.querySelectorAll('terminal-list-view');
  R.forEach(elm => elm.parentNode.removeChild(elm), elements);
};

export default (onOpen, onClose) => {

  const disposable = new CompositeDisposable();
  disposable.add(atom.workspace.addOpener(terminalOpener));
  disposable.add(atom.workspace.onDidAddPaneItem(terminalEvent(onOpen)));
  disposable.add(atom.workspace.onWillDestroyPaneItem(terminalEvent(onClose)));

  return disposable;
};
