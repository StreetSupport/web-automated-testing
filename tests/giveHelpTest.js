/* global casper, phantom, $ */
const pages = require('./pages')
const page = pages.giveHelp
const Browser = require('./browser')

casper.test.begin('Give Help', 2, function (test) {
  new Browser(phantom).setLocation('manchester')
  casper.start(page.url, function () {
    casper.capture('./captures/give-help/initial-load.png')
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
    casper.click('.js-location-select-leeds')

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