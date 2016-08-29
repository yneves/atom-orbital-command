'use babel';

export default () => {

  return {
    workspacesPattern: atom.config.get('chloe.workspaces')
  };
};
