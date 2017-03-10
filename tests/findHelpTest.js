/* global casper, phantom, __utils__, $ */
const pages = require('./pages')
const page = pages.findHelpCategories
const Browser = require('./browser')

const initialPos = { timestamp: Date.now(), coords: {latitude: 53.4624043, longitude: -2.2401217, accuracy: 10} } // manchester uni
const geo = require('casperjs-geolocation')(casper, initialPos)

casper.test.begin('Find Help', 3, function (test) {
  new Browser(phantom).setLocation('manchester')

  casper.start(page.url, function () {
    casper.capture('./captures/find-help/initial-load.png')
  })

  casper.then(function () {
    geo.setPos({latitude: 20, longitude: 20, accuracy: 10})
    casper.capture('./captures/find-help/after-geo.png')
  })

  casper.then(function () {
    casper.evaluate(() => {
      const sel = document.querySelector('.js-modal-location-dropdown')
      sel.selectedIndex = 1 // manchester
      $(sel).change()
    })
    casper.capture('./captures/find-help/after-select-manchester.png')
  })

  casper.then(() => {
    casper.waitUntilVisible(page.selectors.categoryList, () => {
      casper.capture('./captures/find-help/categories.png')
      test.assertEval(() => {
        const categories = __utils__.findAll('.cta')
        return categories.length === 12
      }, 'displays 12 service categories')
    })
  })

  casper.then(() => {
    casper.click('#accom')
    casper.waitUntilVisible('.block__header--find-help', () => {
      casper.capture('./captures/find-help/mcr-accom-services.png')
      test.assertSelectorHasText('.block__header--find-help', 'Accommodation', 'Service category title appears')
      test.assertEval(() => {
        const providers = __utils__.findAll('.accordion__header')
        return providers.length === 10
      }, 'displays Manchester service providers')
    }, () => {
      casper.capture('./captures/find-help/mcr-accom-services--fail.png')
    }, 10000)
  })

  casper.run(() => {
    test.done()
  })
})
