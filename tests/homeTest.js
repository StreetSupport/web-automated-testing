/* global casper, phantom */
const pages = require('./pages')
const Browser = require('./browser')

casper.test.begin('Home', 1, function (test) {
  new Browser(phantom).setLocation('manchester')
  casper.start(pages.home.url, function () {
    casper.capture('./captures/home/initial-load.png')
    casper.waitUntilVisible('.nav__item--manchester', () => {
      test.assertSelectorHasText('.block__header', 'Street Support in Manchester')
    })
  })

  casper.run(() => {
    test.done()
  })
})
