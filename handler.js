const switchFns = {
  bilibili: () => {
    const danmuEl = document.querySelector('.bui-danmu-switch-input')
    if (danmuEl) {
      danmuEl.click()
    }
  }
}

function init() {
  const initBilibili = () => {
    const isDisabled = document.querySelector('.bpx-player-dm-setting.disabled')
    if (!isDisabled) {
      switchFns.bilibili()
    }
  }

  initBilibili()
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    const id = request.id
    if (!id) return
    if (id === 'init') {
      init()
    } else {
      switchFns[request.id]?.()
    }
  }
);