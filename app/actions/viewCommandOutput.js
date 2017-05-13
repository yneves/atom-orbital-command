'use babel';

export default id => (dispatch, getState) => {
  const { runningCommands, finishedCommands, failedCommands } = getState();
  const command = runningCommands[id] || finishedCommands[id] || failedCommands[id];
  if (!command) {
    return;
  }
  atom.workspace.open(command.output, {
    pending: true,
  });
};
