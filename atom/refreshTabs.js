'use babel';

export default (callback) => {

  return atom.workspace.onDidDestroyPaneItem(() => {
    callback();
  });
};
