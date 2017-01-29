'use babel';

export default (callback) => {
  const repos = [];
  const dirs = atom.project.getDirectories();
  let counter = dirs.length;
  dirs.forEach((dir) => {
    atom.project.repositoryForDirectory(dir).then((repository) => {
      if (repository) {
        repos.push(dir.realPath);
      }
      if (--counter === 0) {
        callback(repos);
      }
    });
  });
};
