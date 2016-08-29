'use babel';

import Chloe from '../lib/app/index';

describe('Chloe', () => {
  let workspaceElement;
  let activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('chloe');
  });

  describe('when the chloe:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {

      let chloeElement = workspaceElement.querySelector('.chloe');
      expect(chloeElement).toExist();

      let chloePanel = atom.workspace.panelForItem(chloeElement);
      expect(chloePanel.isVisible()).toBe(true);
    });
  });
});
