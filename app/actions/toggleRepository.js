'use babel';

export default repository => () => {
  const dirs = atom.project.getDirectories().map(dir => dir.path);
  if (dirs.includes(repository)) {
    atom.project.removePath(repository);
  } else {
    atom.project.addPath(repository);
  }
};
