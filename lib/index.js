'use strict'

const raf = require('raf')
module.exports = function gameTicker({ update, render, updatesPerSecond, maxFPS }) {
  const timeInfo = {
    start: Date.now(),
    lastUpdate: Date.now(),
    lastFrame: Date.now()
  }
  const msPerUpdate = 1000 / updatesPerSecond
  const msPerFrame = 1000 / maxFPS
  const dt = msPerUpdate / 1000
  let delta = 0
  let ended

  let timeout
  let animationFrameRequest

  ;(function callUpdate() {
    const previousUpdate = timeInfo.lastUpdate
    timeInfo.lastUpdate = Date.now()
    delta += timeInfo.lastUpdate - previousUpdate
    while (delta >= msPerUpdate) {
      update(timeInfo, dt);
      delta -= msPerUpdate
    }
    timeout = setTimeout(callUpdate, msPerUpdate)
  })()

  ;(function callRender() {
    const now = Date.now()
    if (maxFPS === undefined || now >= timeInfo.lastFrame + msPerFrame) {
      const intoNextUpdate = (now - timeInfo.lastUpdate) / msPerUpdate
      render(timeInfo, intoNextUpdate)
    }
    animationFrameRequest = raf(callRender)
  })()

  return () => {
    clearTimeout(timeout)
    raf.cancel(animationFrameRequest)
  }
}
