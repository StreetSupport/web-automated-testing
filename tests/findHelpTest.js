/* global casper, phantom, __utils__, $ */
const pages = require('./pages')
const page = pages.findHelpCategories
const Browser = require('./browser')

import { ScreenCapture } from '/screen-capture'
const cap = new ScreenCapture('find-help', casper)

const initialPos = { timestamp: Date.now(), coords: {latitude: 53.4624043, longitude: -2.2401217, accuracy: 10} } // manchester uni
const geo = require('casperjs-geolocation')(casper, initialPos)

casper.test.begin('Find Help', 3, function (test) {
  new Browser(phantom).setLocation('manchester')

  casper.start(page.url, function () {
    cap.snapshot('initial-load')
  })

  casper.then(function () {
    geo.setPos({latitude: 20, longitude: 20, accuracy: 10})
    cap.snapshot('after-geo')
  })

  casper.then(function () {
    casper.evaluate(() => {
      const sel = document.querySelector('.js-modal-location-dropdown')
      sel.selectedIndex = 1 // manchester
      $(sel).change()
    })
    cap.snapshot('after-select-manchester')
  })

  casper.then(() => {
    casper.waitUntilVisible(page.selectors.categoryList, () => {
      cap.snapshot('categories')
      test.assertEval(() => {
        const categories = __utils__.findAll('.cta')
        return categories.length === 12
      }, 'displays 12 service categories')
    })
  })

  casper.then(() => {
    casper.click('#accom')
    casper.waitUntilVisible('.block__header--find-help', () => {
      cap.snapshot('mcr-accom-services')
      test.assertSelectorHasText('.block__header--find-help', 'Accommodation', 'Service category title appears')
      test.assertEval(() => {
        const providers = __utils__.findAll('.accordion__header')
        return providers.length === 10
      }, 'displays Manchester service providers')
    }, () => {
      cap.snapshot('mcr-accom-services--fail')
    }, 10000)
  })

  casper.run(() => {
    test.done()
  })
})
