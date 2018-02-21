'use babel';

import fs from 'fs';
import path from 'path';
import {
  FIND_REPOSITORIES_START,
  FIND_REPOSITORIES_FAILED,
  FIND_REPOSITORIES_SUCCESS,
} from '../constants/actionTypes';

export default (useCache = false) => (dispatch, getState) => {
  const { config: { rootDirectory } } = getState();
  if (!rootDirectory) {
    return;
  }

  const cacheFile = path.resolve(rootDirectory, '.orbital-command.json');
  const repositories = [];

  function writeCache(callback) {
    fs.writeFile(cacheFile, JSON.stringify(repositories, null, 2), callback);
  }

  function readCache(callback) {
    if (!useCache) {
      callback(false);
      return;
    }
    fs.readFile(cacheFile, 'utf8', (error, content) => {
      if (error || !content) {
        callback(false);
        return;
      }
      try {
        const data = JSON.parse(content);
        repositories.push(...data);
        callback(true);
      } catch (e) {
        callback(false);
      }
    });
  }

  function getDirs(dir, files, callback) {
    const filteredFiles = files.filter(file => file.indexOf('.') !== 0);
    let counter = filteredFiles.length;
    const dirs = [];
    if (counter === 0) {
      callback(null, dirs);
      return;
    }
    filteredFiles.forEach((file) => {
      fs.stat(path.resolve(dir, file), (statError, stats) => {
        if (statError) {
          counter = 0;
          callback(statError);
          return;
        }
        if (stats && stats.isDirectory()) {
          dirs.push(path.resolve(dir, file));
        }
        if (--counter === 0) {
          callback(null, dirs);
        }
      });
    });
  }

  function readSubDirs(subdirs, callback) {
    let counter = subdirs.length;
    if (counter === 0) {
      callback();
      return;
    }
    subdirs.forEach((subdir) => {
      /* eslint no-use-before-define: 0 */
      readDir(subdir, (error) => {
        if (error) {
          counter = 0;
          callback(error);
          return;
        }
        if (--counter === 0) {
          callback();
        }
      });
    });
  }

  function readDir(dir, callback) {
    fs.readdir(dir, (readdirError, files) => {
      if (readdirError) {
        callback(readdirError);
        return;
      }
      if (files.includes('.git')) {
        repositories.push(dir);
        callback();
      } else {
        getDirs(dir, files, (getdirsError, subdirs) => {
          if (getdirsError) {
            callback(getdirsError);
            return;
          }
          readSubDirs(subdirs, (error) => {
            callback(error);
          });
        });
      }
    });
  }

  dispatch({
    type: FIND_REPOSITORIES_START,
  });
  readCache((cached) => {
    if (cached) {
      dispatch({
        type: FIND_REPOSITORIES_SUCCESS,
        repositories,
      });
      return;
    }
    readDir(rootDirectory, (error) => {
      if (error) {
        dispatch({
          type: FIND_REPOSITORIES_FAILED,
          repositories,
        });
      } else {
        writeCache(() => {
          dispatch({
            type: FIND_REPOSITORIES_SUCCESS,
            repositories,
          });
        });
      }
    });
  });
};
