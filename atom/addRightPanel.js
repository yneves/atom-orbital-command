'use babel';

import {Disposable} from 'atom';

export default (element) => {

  const panel = atom.workspace.addRightPanel({
    item: element,
    visible: true
  });

  return new Disposable(() => {
    panel.destroy();
  });
};
