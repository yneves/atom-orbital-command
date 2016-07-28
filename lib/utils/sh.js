'use babel';

import fs from 'fs';
import path from 'path';
import homeDir from 'home-dir';

const file = path.resolve(homeDir(), '.CHLOE.sh');

export default {

  set: (script, callback) => {
    fs.writeFile(file, script, (error) => {
      if (error) {
        console.error(error);
      }
      if (callback) {
        callback(error);
      }
    });
  },

  clear: (callback) => {
    fs.writeFile(file, '', (error) => {
      if (error) {
        console.error(error);
      }
      if (callback) {
        callback(error);
      }
    });
  }
};
