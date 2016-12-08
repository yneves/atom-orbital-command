'use babel';

import OrbitalCommand from '../lib/app/index';

describe('orbital-command', () => {
  let workspaceElement;
  let activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('orbital-command');
  });

  describe('when the orbital-command:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {

      let element = workspaceElement.querySelector('.orbital-command');
      expect(element).toExist();

      let panel = atom.workspace.panelForItem(element);
      expect(panel.isVisible()).toBe(true);
    });
  });
});
