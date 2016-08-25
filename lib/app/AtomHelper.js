'use babel';

import R from 'ramda';
import uid from 'uid';
import {EventEmitter} from 'events';
import {TextEditor, CompositeDisposable} from 'atom';

export default class AtomHelper extends EventEmitter {

  constructor(element) {
    super();
    this.element = element;
    this.subscriptions = new CompositeDisposable();
    this.sortTabs();
    this.addPanel();
    this.addOpener();
    this.addCommands();
    this.observeTabs();
  }

  destroy() {
    this.panel.destroy();
    this.subscriptions.dispose();
  }

  runCommand(command) {
    atom.commands.dispatch(this.element, command);
  }

  addPanel() {
    this.panel = atom.workspace.addRightPanel({
      item: this.element,
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
          const pane = atom.workspace.paneForURI(id);
          if (pane) {
            return pane.itemForURI(id);
          } else {
            return this.openBrowserTab(url, id);
          }
        }
      })
    );
  }

  observeTabs() {
    this.subscriptions.add(
      atom.workspace.onDidDestroyPaneItem(() => {
        this.emit('refreshTabs');
      })
    );
  }

  sortTabs() {
    const pane = atom.workspace.getActivePane();
    const prototype = pane.__proto__;
    const addItem = prototype.addItem;
    prototype.addItem = (item) => {
      if (R.is(TextEditor, item)) {
        addItem.call(pane, item, 0);
      } else {
        addItem.call(pane, item, pane.items.length);
      }
    };
  }

  openBrowserTab(url, id = uid()) {
    const div = document.createElement('div');
    div.id = id;
    setTimeout(() => {
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
