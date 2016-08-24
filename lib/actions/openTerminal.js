'use babel';

import R from 'ramda';
import fs from 'fs';
import path from 'path';
import homeDir from 'home-dir';
import app from '../app';

import { OPEN_TERMINAL } from '../constants/actionTypes';

export default (dir, env = {}) => (dispatch) => {

  const script = [`cd ${dir}`];

  R.keys(env).forEach((key) => {
    const val = env[key].replace(/\W/g, (char) => '\\' + char);
    script.unshift(`export ${key}=${val}`);
  });

  setScript(script.join(' && '), (error) => {
    if (!error) {

      app.openTerminal();

      dispatch({
        type: OPEN_TERMINAL,
        dir,
      });

      setTimeout(clearScript, 1500);
    }
  });
};

const setScript = (script, callback) => {
  const file = path.resolve(homeDir(), '.CHLOE.sh');
  fs.writeFile(file, script, (error) => {
    if (error) {
      console.error(error);
    }
    if (callback) {
      callback(error);
    }
  });
};

const clearScript = (callback) => {
  const file = path.resolve(homeDir(), '.CHLOE.sh');
  fs.writeFile(file, '', (error) => {
    if (error) {
      console.error(error);
    }
    if (callback) {
      callback(error);
    }
  });
};
