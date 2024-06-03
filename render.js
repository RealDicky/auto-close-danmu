async function render() {
  const website = [{ name: "bilibili", id: "bilibili" }];

  const renderSwitch = () => {
    const switchEl = website.reduce((pre, cur) => {
      pre += `
      <div class='switch'>
        <div>${cur.name}</div>
        <div class='wrapper'>
          <input class='switch-${cur.id}' checked type="checkbox" id='${cur.id}'>
          <label for="${cur.id}"></label>
        </div>
      </div>
      `;
      return pre;
    }, "");

    document.body.innerHTML = switchEl;
  };

  renderSwitch();

  const id = await getTabId();

  if (!id) return;

  document.body.addEventListener('click', async (e) => {
    if (e.target?.tagName !== 'INPUT') return;
    const id = e.target.classList[0].split('-')[1]
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    await chrome.tabs.sendMessage(tab.id, { id });
  })

}

render();



function getTabId() {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query(
        {
          active: true,
        },
        function (tabs) {
          if (tabs[0]?.url && !tabs[0].url.startsWith('chrome://')) {
            return resolve(tabs[0].id);
          }
          resolve()
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}
