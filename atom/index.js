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
      pinnedRepositories: atom.config.get('orbital-command.pinnedRepositories'),
    });

    this.element = document.createElement('div');
    this.element.id = 'orbital-command';
    this.element.classList.add('orbital-command');

    const { subscribe, getState, getActions } = bootstrap(this.element, state);
    const actions = getActions();
    this.getState = getState;

    this.disposable = new CompositeDisposable();
    this.disposable.add(
      addCommands(),
      observeTextEditors(actions.fileSaved),
      addRightPanel(this.element),
      observeDirectories(this.element, actions.refreshRepositories),
    );

    let previousPinnedRepositories = state.pinnedRepositories;
    subscribe(() => {
      const { pinnedRepositories } = getState();
      if (pinnedRepositories !== previousPinnedRepositories) {
        atom.config.set('orbital-command.pinnedRepositories', pinnedRepositories);
        previousPinnedRepositories = pinnedRepositories;
      }
    });

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
