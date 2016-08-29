'use babel';

export default (element) => {
  atom.commands.dispatch(element, 'window:reload');
};
