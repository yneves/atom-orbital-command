'use babel';

import R from 'ramda';
import gitStatus from './gitStatus';
import {
  EDIT_FILE
} from '../constants/actionTypes';

export default () => (dispatch, getState) => {
  atom.workspace.observeTextEditors((editor) => {
    editor.onDidSave((event) => {

      const {repositories} = getState();
      R.keys(repositories).forEach((repositoryId) => {
        const repository = repositories[repositoryId];
        if (event.path.startsWith(repository.dir)) {
          gitStatus(repository.id)(dispatch, getState);
        }
      });
    });
  });
};
