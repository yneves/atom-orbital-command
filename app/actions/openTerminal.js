'use babel';

import R from 'ramda';
import fs from 'fs';
import uid from 'uid';
import path from 'path';
import homeDir from 'home-dir';

import { OPEN_TERMINAL } from '../constants/actionTypes';

export default terminal => (dispatch) => {
  terminal.id = terminal.id || uid();
  terminal.env = terminal.env || {};

  const script = [`cd ${terminal.dir}`];

  R.keys(terminal.env).forEach((key) => {
    const val = terminal.env[key].replace(/\W/g, char => `\\${char}`);
    script.unshift(`export ${key}=${val};`);
  });

  setScript(script.join('\n'), (error) => {
    if (!error) {
      atom.workspace.open('/TERMINAL', terminal);

      dispatch({
        type: OPEN_TERMINAL,
        ...terminal,
      });

      setTimeout(() => setScript(''), 1500);
    }
  });
};

const setScript = (script, callback) => {
  const file = path.resolve(homeDir(), '.orbital-command.sh');
  fs.writeFile(file, script, (error) => {
    if (error) {
      console.error(error);
    }
    if (callback) {
      callback(error);
    }
  });
};
