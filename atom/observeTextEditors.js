'use babel';

export default callback => atom.workspace.observeTextEditors((editor) => {
  editor.onDidSave(callback);
});
