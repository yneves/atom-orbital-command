'use babel';

import {CompositeDisposable} from 'atom';
import getConfig from './getConfig';
import sortTabs from './sortTabs';
import refreshTabs from './refreshTabs';
import addCommands from './addCommands';
import addRightPanel from './addRightPanel';
import addBrowserOpener from './addBrowserOpener';
import observeTextEditors from './observeTextEditors';
import openTerminal from './openTerminal';
import App from '../app/App';

export default {

  activate(state = {}) {

    state.config = getConfig();

    this.element = document.createElement('div');
    this.app = new App(this.element, state);
    this.actions = this.app.getActions();

    this.disposable = new CompositeDisposable();
    this.disposable.add(sortTabs());
    this.disposable.add(refreshTabs(this.actions.refreshTabs));
    this.disposable.add(addCommands());
    this.disposable.add(addBrowserOpener());
    this.disposable.add(observeTextEditors(this.actions.fileSaved));
    this.disposable.add(addRightPanel(this.element));

    this.app.render();
  },

  deactivate() {
    this.element.remove();
    this.disposable.dispose();
  },

  serialize() {
    return this.app.getState();
  },

  openTerminal() {
    openTerminal(this.element);
  }

};
