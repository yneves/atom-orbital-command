'use babel';

export default (callback) => {

  return atom.workspace.observeTextEditors((editor) => {
    editor.onDidSave(callback);
  });
};
