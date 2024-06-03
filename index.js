const switchFns = {
  bilibili: () => {
    const danmuEl = document.querySelector('.bui-danmaku-switch-input')
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

document.addEventListener('DOMContentLoaded', () => setTimeout(init, 1500))

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