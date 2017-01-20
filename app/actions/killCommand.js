'use babel';

import psTree from 'ps-tree';
import R from 'ramda';
import cp from 'child_process';
import {
  KILL_COMMAND,
} from '../constants/actionTypes';

export default id => (dispatch, getState) => {
  const running = getState().runningCommands[id];
  if (running && running.pid) {
    psTree(running.pid, (error, children) => {
      if (error) {
        console.error(error);
      } else {
        const pids = children.map(p => p.PID);
        const killCommand = R.join(' ', R.concat(
          [running.command.kill || 'kill -9'], pids, [running.pid],
        ));
        cp.exec(killCommand, {}, (error, stdout, stderr) => {
          if (error || stderr) {
            console.error(error || stderr);
          }
        });
      }
    });
  }

  return {
    type: KILL_COMMAND,
    command: { id },
  };
};
