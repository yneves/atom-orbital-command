'use babel';

import psTree from 'ps-tree';
import R from 'ramda';
import cp from 'child_process';
import showNotification from './showNotification';

import { KILL_COMMAND } from '../constants/actionTypes';

export default id => (dispatch, getState) => {
  const running = getState().runningCommands[id];
  if (running && running.pid) {
    psTree(running.pid, (error, children) => {
      if (error) {
        showNotification({
          type: 'error',
          message: `Failed to load process: ${running.pid}`,
          detail: error,
        });
      } else {
        const pids = children.map(p => p.PID);
        const killCommand = R.join(' ', R.concat(
          [running.command.kill || 'kill -9'], pids, [running.pid],
        ));
        cp.exec(killCommand, {}, (errorKill, stdout, stderr) => {
          if (errorKill) {
            showNotification({
              type: 'error',
              message: `Failed to kill command: ${running.pid}`,
              detail: stderr,
            });
          }
        });
      }
    });
  }

  dispatch({
    type: KILL_COMMAND,
    command: { id },
  });
};
