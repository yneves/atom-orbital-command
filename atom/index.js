'use babel';

import { CompositeDisposable } from 'atom';
import addCommands from './addCommands';
import addRightPanel from './addRightPanel';
import observeTextEditors from './observeTextEditors';
import observeDirectories from './observeDirectories';
import bootstrap from '../app/bootstrap';

export default {

  config: {
    rootDirectory: {
      type: 'string',
      default: '~/',
    },
  },

  activate(state = {}) {
    Object.assign(state, {
      config: {
        rootDirectory: atom.config.get('orbital-command.rootDirectory'),
      },
    });

    this.element = document.createElement('div');
    this.element.id = 'orbital-command';
    this.element.classList.add('orbital-command');

    const { getState, getActions } = bootstrap(this.element, state);
    const actions = getActions();
    this.getState = getState;

    this.disposable = new CompositeDisposable();
    this.disposable.add(
      addCommands(),
      observeTextEditors(actions.fileSaved),
      addRightPanel(this.element),
      observeDirectories(this.element, actions.refreshDirectory),
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
