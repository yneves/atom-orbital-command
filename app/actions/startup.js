'use babel';

import openBookmark from './openBookmark';
import openTerminal from './openTerminal';

export default () => (dispatch, getState) => {

  const {
    browserTabs,
    terminalTabs,
  } = getState();

  browserTabs.forEach(browserTab => {
    openBookmark(browserTab.id, browserTab.url)(dispatch, getState);
  });

  terminalTabs.forEach(terminalTab => {
    if (terminalTab.dir) {
      openTerminal(terminalTab)(dispatch, getState);
    }
  });
};
