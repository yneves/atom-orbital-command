'use babel';

function clickLink (url) {
  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  link.setAttribute('href', url);
  document.body.appendChild(link);
  link.click();
}

function findTabId(previous, values) {
  const tabIds = values.filter((value) => {
    return !previous.includes(value);
  });
  console.log(tabIds);
  return tabIds[0];
}

function newTab(url) {
  return this
    .getTabIds()
    .then(previousTabIds => {
      return this
        .getCurrentTabId()
        .then(previousTabId => {
          return this
            .blank()
            .execute(clickLink, url)
            .getTabIds()
            .then(newTabIds => {
              return this
                .switchTab(previousTabId)
                .back()
                .then(() => {
                  return {
                    id: findTabId(previousTabIds, newTabIds),
                    url: url
                  };
                });
            });
        });
    });
}

export default newTab;
