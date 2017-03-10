/* global casper, phantom */
const pages = require('./pages')
const Browser = require('./browser')

casper.test.begin('Home', 2, function (test) {
  casper.start(pages.home.url, function () {
    casper.capture('./captures/home/initial-load.png')
    this.click('.js-location-pin')
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
      test.assertSelectorHasText('.block__header', 'Street Support')
      test.assertSelectorHasText('.js-city-label', 'in Manchester')
    })
  })

  casper.run(() => {
    test.done()
  })
})
