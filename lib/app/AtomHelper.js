'use babel';

import R from 'ramda';
import uid from 'uid';
import {EventEmitter} from 'events';
import {TextEditor, CompositeDisposable} from 'atom';

export default class AtomHelper extends EventEmitter {

  constructor() {
    super();
    this.subscriptions = new CompositeDisposable();
  }

  destroy() {
    this.panel.destroy();
    this.subscriptions.dispose();
  }

  addPanel(element) {
    this.panel = atom.workspace.addRightPanel({
      item: element,
      visible: true
    });
  }

  addCommands() {
    this.subscriptions.add(
        atom.commands.add('atom-workspace', {
        'chloe:reset': () => this.emit('reset'),
        'chloe:toggle': () => this.emit('toggle')
      })
    );
  }

  addOpener() {
    this.subscriptions.add(
      atom.workspace.addOpener((url, {id}) => {
        if (/^http\:|^https\:/.test(url)) {
          const pane = atom.workspace.paneForItem(id);
          if (pane) {

          } else {
            return this.openBrowserTab(url, id);
          }
        }
      })
    );
  }

  sortTabs(id) {
    const pane = atom.workspace.paneForURI(id);
    const items = pane.getItems();
    const sortItems = R.reject(R.is(TextEditor), items);
    sortItems.forEach((item) => {
      pane.moveItem(item, items.length - 1);
    });
  }

  openBrowserTab(url, id = uid()) {
    const div = document.createElement('div');
    div.id = id;
    setTimeout(() => {
      this.sortTabs(id);
      this.emit('openUrl', {id, url});
    }, 100);
    return {
      element: div,
      getTitle: () => '',
      getURI: () => id,
      getPath: () => id,
      destroy: () => {
        this.emit('closeUrl', {id, url});
      }
    };
  }

};
