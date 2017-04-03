/* global casper, phantom, __utils__ */
const pages = require('./pages')
const page = pages.giveHelp
const Browser = require('./browser')

import { ScreenCapture } from '/screen-capture'
const cap = new ScreenCapture('give-help', casper)

const initialPos = { timestamp: Date.now(), coords: {latitude: 10, longitude: 10, accuracy: 10} }
const geo = require('casperjs-geolocation')(casper, initialPos)

casper.test.begin('Give Help', 2, function (test) {
  new Browser(phantom).setLocation('manchester')

  casper.start(page.url, function () {
    cap.snapshot('initial-load')
  })

  casper.then(function () {
    geo.setPos({latitude: 20, longitude: 20, accuracy: 10})
    cap.snapshot('after-geo')
  })

  casper.then(() => {
    casper.waitUntilVisible(page.selectors.item, () => {
      cap.snapshot('need-list-manchester')
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
      cap.snapshot('need-list-leeds')
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