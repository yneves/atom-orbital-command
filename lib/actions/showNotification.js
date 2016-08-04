'use babel';

export default (options) => {

  const type = {
    info: 'addInfo',
    warning: 'addWarning',
    error: 'addError',
    success: 'addSuccess'
  }[options.type];

  const notification = atom.notifications[type](options.message, {
    detail: options.detail,
    dismissable: true
  });

  const duration = options.duration || 5000;
  if (duration) {
    setTimeout(() => notification.dismiss(), duration);
  }
};
