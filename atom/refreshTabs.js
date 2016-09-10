'use babel';

import {CompositeDisposable} from 'atom';

export default (callback) => {

  const disposable = new CompositeDisposable();
  const pane = atom.workspace.getActivePane();

  disposable.add(
    pane.onDidMoveItem(callback),
    atom.workspace.onDidDestroyPaneItem(callback)
  );

  return disposable;
};
