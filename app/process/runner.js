'use babel';

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const mkdirp = require('mkdirp');


export default (exec, out, opts) => {
  const args = exec.split(' ');
  const cmd = args.shift();
  const output = fs.createWriteStream(path.resolve(out, 'output.txt'));

  mkdirp(out, () => {
    const startTime = Date.now();
    let status = 'running';

    const proc = cp.spawn(cmd, args, {
      ...opts,
      stdio: 'pipe',
    });

    const updateStatus = () => {
      const file = path.resolve(out, 'pid.txt');
      const timeSpent = Date.now() - startTime;
      fs.writeFile(file, `${proc.pid} ${status} ${timeSpent}`, () => {});
    };

    updateStatus();

    proc.stdout.pipe(output);
    proc.stderr.pipe(output);

    proc.stdout.on('data', () => {
      if (status === 'running') {
        status = 'output';
        updateStatus();
      }
    });
    proc.stderr.on('data', () => {
      if (status === 'running') {
        status = 'failed';
        updateStatus();
      }
    });
    proc.on('close', (code) => {
      status = code !== 0 ? 'failed' : 'done';
      updateStatus();
    });
  });
};
