/* global casper, phantom */
const pages = require('./pages')
import { ScreenCapture } from '/screen-capture'

casper.clear()
phantom.clearCookies()

const cap = new ScreenCapture('home', casper)

casper.test.begin('Home', 2, function (test) {
  casper.start(pages.home.url, function () {
    cap.snapshot('initial-load')
    this.click('.js-location-pin')
    test.assertVisible('.modal-body', 'modal appears')

    cap.snapshot('modal')

    casper.evaluate(() => {
      const sel = document.querySelector('.js-modal-location-dropdown')
      sel.value = 'manchester'
      var evt = document.createEvent('HTMLEvents')
      evt.initEvent('change', true, false)
      sel.dispatchEvent(evt)
    })
    cap.snapshot('manchester-selected')
    casper.waitUntilVisible('.js-current-city', () => {
      cap.snapshot('manchester-specific')
      test.assertSelectorHasText('.block__header', 'Street Support in Manchester')
    })
  })

  casper.run(() => {
    test.done()
  })
})
