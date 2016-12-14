/* global casper, phantom, $ */
const pages = require('./pages')
const page = pages.findHelpCategories
const Browser = require('./browser')

casper.test.begin('FindHelp', 4, function (test) {
  new Browser(phantom).setLocation('manchester')
  casper.start(page.url, function () {
    casper.capture('./captures/find-help/initial-load.png')
    casper.waitUntilVisible(page.selectors.categoryList, () => {
      test.assertEval(() => {
        const categories = __utils__.findAll('.cta')
        return categories.length === 12
      }, 'displays 12 service categories')
    })
  })

  casper.then(() => {
    casper.click('a[href="category/?category=accom"]')
    casper.waitUntilVisible('.block__header--find-help', () => {
      casper.capture('./captures/find-help/mcr-accom-services.png')
      test.assertSelectorHasText('.block__header--find-help', 'Accommodation', 'Service category title appears')
      test.assertEval(() => {
        const providers = __utils__.findAll('.accordion__header')
        return providers.length === 10
      }, 'displays Manchester service providers')
    })
  })

  casper.then(() => {
    casper.click('.js-find-help-dropdown')
    casper.evaluate(() => {
      const form = document.querySelector('.js-find-help-dropdown')
      form.selectedIndex = 0
      $(form).change()
    })
    casper.evaluate(() => {
      const form = document.querySelector('.js-find-help-range')
      form.selectedIndex = 3
      $(form).change()
    })
    casper.click('.js-find-help-submit')
    casper.waitUntilVisible('.nav__item--leeds', () => {
      casper.capture('./captures/find-help/leeds-accom-services.png')
      casper.waitUntilVisible('.js-accordion', () => {
        casper.capture('./captures/find-help/leeds-accom-services2.png')
          test.assertEval(() => {
            const providers = __utils__.findAll('.accordion__header')
            console.log(providers.length)
            return providers.length === 6
          }, 'displays Leeds service providers')
        })
    })
  })

  casper.run(() => {
    test.done()
  })
})
