'use babel';

import {CompositeDisposable} from 'atom';
import getConfig from './getConfig';
import sortTabs from './sortTabs';
import refreshTabs from './refreshTabs';
import addCommands from './addCommands';
import addRightPanel from './addRightPanel';
import addBrowserOpener from './addBrowserOpener';
import addTerminalOpener from './addTerminalOpener';
import observeTextEditors from './observeTextEditors';
import openTerminal from './openTerminal';
import bootstrap from '../app/bootstrap';

export default {

  activate(state = {}) {

    state.config = getConfig();

    this.element = document.createElement('div');
    this.element.id = 'chloe';
    this.element.classList.add('chloe');

    const {getState, getActions} = bootstrap(this.element, state);
    const actions = getActions();
    this.getState = getState;

    this.disposable = new CompositeDisposable();
    this.disposable.add(
      sortTabs(),
      refreshTabs(actions.refreshTabs),
      addCommands(),
      addBrowserOpener(actions.browserOpened, actions.browserClosed),
      addTerminalOpener(actions.terminalOpened, actions.terminalClosed),
      observeTextEditors(actions.fileSaved),
      addRightPanel(this.element)
    );

    actions.startup();
  },

  deactivate() {
    this.element.remove();
    this.disposable.dispose();
  },

  serialize() {
    return this.getState();
  }

};
