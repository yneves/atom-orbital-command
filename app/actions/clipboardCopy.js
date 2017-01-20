'use babel';

import clipboardCopy from '../../atom/clipboardCopy';

import {
  CLIPBOARD_COPY,
} from '../constants/actionTypes';

export default (text) => {
  clipboardCopy(text);
  return {
    type: CLIPBOARD_COPY,
    text,
  };
};
