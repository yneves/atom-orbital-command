'use babel';

import R from 'ramda';
import cp from 'child_process';
import {
  EXECUTE_COMMAND,
  EXECUTE_COMMAND_FAILED,
  EXECUTE_COMMAND_PROGRESS,
  EXECUTE_COMMAND_SUCCESS,
} from '../constants/actionTypes';

export default command => (dispatch) => {
  const timeSpent = Date.now();
  let stdout = '';
  let stderr = '';
  let pid;

  const _dispatch = (type, error) => {
    dispatch({
      type,
      command,
      pid,
      error: error ? error.toString() : null,
      stderr,
      stdout,
      timeSpent: Date.now() - timeSpent,
    });
  };

  const proc = cp.exec(command.command, {
    cwd: command.dir,
    env: R.merge(process.env, command.env),
  }, (error) => {
    const failed = error || /\w/.test(stderr);
    const type = failed ? EXECUTE_COMMAND_FAILED : EXECUTE_COMMAND_SUCCESS;
    _dispatch(type, error);
  });

  pid = proc.pid;
  _dispatch(EXECUTE_COMMAND);

  proc.stdout.on('data', (data) => {
    stdout += data;
    _dispatch(EXECUTE_COMMAND_PROGRESS);
  });

  proc.stderr.on('data', (data) => {
    stderr += data;
    _dispatch(EXECUTE_COMMAND_PROGRESS);
  });
};
