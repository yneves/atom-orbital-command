'use babel';

import os from 'os';
import fs from 'fs';
import cp from 'child_process';
import path from 'path';
import lodash from 'lodash';

import {
  EXECUTE_COMMAND,
  EXECUTE_COMMAND_FAILED,
  EXECUTE_COMMAND_PROGRESS,
  EXECUTE_COMMAND_SUCCESS,
} from '../constants/actionTypes';

export default command => (dispatch, getState) => {
  const runCommand = (payload) => {
    const args = command.command.split(' ');
    const cmd = args.shift();
    const startTime = Date.now();
    const proc = cp.spawn(cmd, args, {
      cwd: command.cwd,
      env: lodash.extend({}, process.env, command.env),
    });

    dispatch({
      type: EXECUTE_COMMAND,
      status: 'running',
      pid: proc.pid,
      ...payload,
    });

    const output = fs.createWriteStream(payload.output, { flags: 'a' });
    proc.stdout.pipe(output);
    proc.stderr.pipe(output);

    proc.stdout.once('data', () => {
      dispatch({
        type: EXECUTE_COMMAND_PROGRESS,
        status: 'output',
        pid: proc.pid,
        ...payload,
      });
    });

    proc.stderr.once('data', () => {
      dispatch({
        type: EXECUTE_COMMAND_PROGRESS,
        status: 'failed',
        pid: proc.pid,
        ...payload,
      });
    });
    proc.on('close', (code) => {
      dispatch({
        type: code === 0 ? EXECUTE_COMMAND_SUCCESS : EXECUTE_COMMAND_FAILED,
        status: code === 0 ? 'done' : 'success',
        pid: proc.pid,
        timeSpent: Date.now() - startTime,
        ...payload,
      });
    });
  };

  const { runningCommands } = getState();
  let runningCommand = runningCommands[command.id];

  // command already running, just resume watching
  if (!runningCommand || runningCommand.status === 'done') {
    runningCommand = {
      command,
      status: '',
      output: path.resolve(os.tmpdir(), `${command.id}.txt`),
    };
    runCommand(runningCommand);
  }
};
