'use babel';

export default callback => atom.project.onDidChangePaths(() => callback());
