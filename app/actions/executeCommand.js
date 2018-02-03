'use babel';

import os from 'os';
import fs from 'fs';
import uid from 'uid';
import cp from 'child_process';
import path from 'path';

import {
  EXECUTE_COMMAND_START,
  EXECUTE_COMMAND_FAILED,
  EXECUTE_COMMAND_PROGRESS,
  EXECUTE_COMMAND_SUCCESS,
} from '../constants/actionTypes';

export default (repository, input) => dispatch => new Promise((resolve, reject) => {
  console.log(repository, input);
  const regexCwd = /^([\w-/]+):/;
  let cwd = repository;
  let command = input.trim();
  if (regexCwd.test(input)) {
    cwd = path.resolve(cwd, regexCwd.exec(input)[1]);
    command = input.replace(regexCwd, '').trim();
  }

  const startTime = Date.now();
  const file = path.resolve(os.tmpdir(), `${uid()}.txt`);

  const proc = cp.exec(command, { cwd, env: process.env });

  const payload = {
    repository,
    pid: proc.pid,
    cwd,
    command,
    input,
    output: file,
  };

  dispatch({
    type: EXECUTE_COMMAND_START,
    running: true,
    stdout: false,
    stderr: false,
    exit: null,
    elapsed: null,
    ...payload,
  });

  const output = fs.createWriteStream(file, { flags: 'a' });
  proc.stdout.pipe(output);
  proc.stderr.pipe(output);

  proc.stdout.once('data', () => {
    dispatch({
      type: EXECUTE_COMMAND_PROGRESS,
      stdout: true,
      ...payload,
    });
  });

  proc.stderr.once('data', () => {
    dispatch({
      type: EXECUTE_COMMAND_PROGRESS,
      stderr: true,
      ...payload,
    });
  });

  proc.on('close', (code) => {
    dispatch({
      type: code === 0 ? EXECUTE_COMMAND_SUCCESS : EXECUTE_COMMAND_FAILED,
      elapsed: Date.now() - startTime,
      exit: code,
      running: false,
      ...payload,
    });
    if (code === 0) {
      resolve(payload);
    } else {
      reject();
    }
  });
});
