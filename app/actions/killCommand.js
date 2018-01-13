'use babel';

import psTree from 'ps-tree';
import cp from 'child_process';
import showNotification from './showNotification';

import { KILL_COMMAND } from '../constants/actionTypes';

export default command => (dispatch) => {
  if (command && command.pid) {
    psTree(command.pid, (error, children) => {
      if (error) {
        showNotification({
          type: 'error',
          message: `Failed to load process: ${command.pid}`,
          detail: error,
        });
      } else {
        const pids = children.map(p => p.PID);
        const cmd = ['kill -9'].concat(pids).concat(command.pid).join(' ');
        cp.exec(cmd, {}, (errorKill, stdout, stderr) => {
          if (errorKill) {
            showNotification({
              type: 'error',
              message: `Failed to kill command: ${command.pid}`,
              detail: stderr,
            });
          }
        });
      }
    });
  }

  dispatch({
    type: KILL_COMMAND,
    ...command,
  });
};
