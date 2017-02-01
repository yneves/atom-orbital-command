'use babel';

import { CompositeDisposable } from 'atom';
import sortTabs from './sortTabs';
import refreshTabs from './refreshTabs';
import addCommands from './addCommands';
import addRightPanel from './addRightPanel';
import addBrowserOpener from './addBrowserOpener';
import addTerminalOpener from './addTerminalOpener';
import observeTextEditors from './observeTextEditors';
import observeDirectories from './observeDirectories';
import bootstrap from '../app/bootstrap';

const configPattern = 'workspacesGlobPattern';

export default {

  config: {
    [configPattern]: {
      type: 'string',
      default: '~/*.orbital-command.js',
    },
  },

  activate(state = {}) {
    state.config = {
      [configPattern]: atom.config.get(`orbital-command.${configPattern}`),
    };

    this.element = document.createElement('div');
    this.element.id = 'orbital-command';
    this.element.classList.add('orbital-command');

    const { getState, getActions } = bootstrap(this.element, state);
    const actions = getActions();
    this.getState = getState;

    this.disposable = new CompositeDisposable();
    this.disposable.add(
      sortTabs(),
      refreshTabs(actions.refreshTabs),
      addCommands(),
      addBrowserOpener(actions.browserOpened, actions.browserClosed),
      addTerminalOpener(actions),
      observeTextEditors(actions.fileSaved),
      addRightPanel(this.element),
      observeDirectories(actions.toggleDirectory),
    );

    actions.startup();
  },

  deactivate() {
    this.element.remove();
    this.disposable.dispose();
  },

  serialize() {
    return this.getState();
  },

};
