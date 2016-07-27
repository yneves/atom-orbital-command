'use babel';

import psTree from 'ps-tree';
import R from 'ramda';
import cp from 'child_process';
import {
  KILL_COMMAND
} from '../constants/actionTypes';

export default (command) => {

  const pid = command.runningCommand;
  psTree(pid, (error, children) => {
    if (error) {
      console.error(error);
    } else {
      const pids = children.map(p => p.PID);
      cp.spawn('kill', R.concat(['-9'], pids, pid));
    }
  });

  return {
    type: KILL_COMMAND,
    command,
  };
};
