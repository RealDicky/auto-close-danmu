const switchFns = {
  bilibili: () => {
    const danmakuEl = document.querySelector('.bui-danmaku-switch-input')
    if (danmakuEl) {
      danmakuEl.click()
    }
  }
}

function init() {
  const initBilibili = () => {
    const isDisabled = document.querySelector('.bpx-player-dm-setting.disabled')

    console.log({isDisabled});
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
    console.log({ id });
    if (id === 'init') {
      init()
    } else {
      switchFns[request.id]?.()
    }
  }
);