/* global casper, phantom, __utils__ */
const pages = require('./pages')
const page = pages.giveHelp
const Browser = require('./browser')

const initialPos = { timestamp: Date.now(), coords: {latitude: 10, longitude: 10, accuracy: 10} }
const geo = require('casperjs-geolocation')(casper, initialPos)

casper.test.begin('Give Help', 2, function (test) {
  new Browser(phantom).setLocation('manchester')

  casper.start(page.url, function () {
    casper.capture('./captures/give-help/initial-load.png')
  })

  casper.then(function () {
    geo.setPos({latitude: 20, longitude: 20, accuracy: 10})
    casper.capture('./captures/give-help/after-geo.png')
  })

  casper.then(() => {
    casper.waitUntilVisible(page.selectors.item, () => {
      casper.capture('./captures/give-help/need-list-manchester.png')
      test.assertEval(() => {
        const helpRequests = __utils__.findAll('.requests-listing__link')
        return helpRequests.length > 0
      }, 'displays Manchester help requests')
    })
  })

  casper.then(() => {
    casper.click('.js-location-pin')
    casper.evaluate(() => {
      const sel = document.querySelector('.js-modal-location-dropdown')
      sel.selectedIndex = 2 // leeds
      sel.onchange()
    })

    casper.waitUntilVisible(page.selectors.item, () => {
      casper.capture('./captures/give-help/need-list-leeds.png')
      test.assertEval(() => {
        const helpRequests = __utils__.findAll('.requests-listing__link')
        return helpRequests.length > 0
      }, 'displays Leeds help requests')
    })
  })

  casper.run(() => {
    test.done()
  })
})