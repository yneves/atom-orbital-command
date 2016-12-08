'use babel';

export default () => {

  return {
    workspacesPattern: atom.config.get('orbital-command.workspaces')
  };
};
