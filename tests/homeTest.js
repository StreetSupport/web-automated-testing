/* global casper, phantom */
const pages = require('./pages')

casper.clear()
phantom.clearCookies()

casper.test.begin('Home', 2, function (test) {
  casper.start(pages.home.url, function () {
    casper.capture('./captures/home/initial-load.png')
    this.click('.js-location-pin')
    test.assertVisible('.modal-body', 'modal appears')
    casper.capture('./captures/home/modal.png')
    casper.evaluate(() => {
      const sel = document.querySelector('.js-modal-location-dropdown')
      sel.value = 'manchester'
      var evt = document.createEvent('HTMLEvents')
      evt.initEvent('change', true, false)
      sel.dispatchEvent(evt)
    })
    casper.capture('./captures/home/manchester-selected.png')
    casper.waitUntilVisible('.js-current-city', () => {
      casper.capture('./captures/home/manchester-specific.png')
      test.assertSelectorHasText('.block__header', 'Street Support in Manchester')
    })
  })

  casper.run(() => {
    test.done()
  })
})
