'use babel';

export default (element, callback) => atom.project.onDidChangePaths(() => {
  atom.commands.dispatch(element, 'tree-view:show');
  callback();
});
