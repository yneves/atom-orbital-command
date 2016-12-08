'use babel';

export default (element) => {

  return atom.commands.add('atom-workspace', {
    'orbital-command:reset': () => ({}),
    'orbital-command:toggle': () => ({})
  });
};
