'use babel';

import R from 'ramda';
import {Disposable, TextEditor} from 'atom';

const isTextEditor = R.is(TextEditor);
const isNotTextEditor = R.pipe(isTextEditor, R.not);
const isTerminal = (item) => !!item.terminal;
const isBrowser = (item) => !!item.browser;
const isNotBrowser = R.pipe(isBrowser, R.not);

export default () => {

  const pane = atom.workspace.getActivePane();
  const prototype = pane.__proto__;
  const addItem = prototype.addItem;

  prototype.addItem = (item, opts = {}) => {

    const items = pane.getItems();

    if (isTextEditor(item)) {
      const index = R.findIndex(isNotTextEditor, items);
      opts.index = index > 0 ? index - 1 : 0;

    } else if (isTerminal(item)) {
      const index = R.findIndex(isNotBrowser, items);
      opts.index = index > 0 ? index - 1 : items.length;

    } else if (isBrowser(item)) {
      opts.index = items.length;
    }

    return addItem.call(pane, item, opts);
  };

  return new Disposable(() => {
    prototype.addItem = addItem;
  });
};
