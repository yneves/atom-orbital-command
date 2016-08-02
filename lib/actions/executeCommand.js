'use babel';

import cp from 'child_process';
import {
  EXECUTE_COMMAND,
  EXECUTE_COMMAND_FAILED,
  EXECUTE_COMMAND_PROGRESS,
  EXECUTE_COMMAND_SUCCESS,
} from '../constants/actionTypes';

export default (command) => (dispatch) => {

  const proc = cp.exec(command.command, {
    cwd: command.dir,
    env: process.env
  }, (error, stdout, stderr) => {
    if (error || /\w/.test(stderr)) {
      dispatch({
        type: EXECUTE_COMMAND_FAILED,
        command,
        error,
        stderr,
      });
    } else {
      dispatch({
        type: EXECUTE_COMMAND_SUCCESS,
        command,
        stdout,
      });
    }
  });

  dispatch({
    type: EXECUTE_COMMAND,
    command,
    pid: proc.pid
  });

  let out = '';
  let err = '';

  proc.stdout.on('data', (data) => {
    out += data;
    dispatch({
      type: EXECUTE_COMMAND_PROGRESS,
      command,
      stderr: err,
      stdout: out
    });
  });

  proc.stderr.on('data', (data) => {
    err += data;
    dispatch({
      type: EXECUTE_COMMAND_PROGRESS,
      command,
      stderr: err,
      stdout: out
    });
  });
};
