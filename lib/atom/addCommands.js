'use babel';

export default (element) => {

  return atom.commands.add('atom-workspace', {
    'chloe:reset': () => ({}),
    'chloe:toggle': () => ({})
  });
};
