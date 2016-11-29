/* global phantom, casper */

const pages = require('../pages')
const page = pages.offerItem
const Browser = require('../browser')

const tests = {
  onLoad: [
    (test) => test.assertSelectorHasText(page.selectors.title, 'Offer Items'),
    (test) => test.assertTitle('Offer Items - Street Support'),
    (test) => test.assertExists(page.selectors.form, 'Form is available'),
    (test) => test.assertNotVisible(page.selectors.failTitle),
    (test) => test.assertNotVisible(page.selectors.successTitle)
  ],
  onFormSubmitted: [
    (test) => test.assertNotVisible(page.selectors.form),
    (test) => test.assertNotVisible(page.selectors.failTitle),
    (test) => test.assertSelectorHasText(page.selectors.successTitle, 'Thank you for submitting your details!', 'Thank you message appears')
  ]
}

const totalTests = tests.onLoad.length + tests.onFormSubmitted.length

casper.test.begin('Offer Items', totalTests, function (test) {
  new Browser(phantom).setLocation('manchester')
  casper.start(page.url, function () {
    casper.capture('./captures/offer-items/initial-load.png')
    tests.onLoad.forEach(t => t(test))
  })

  casper.then(() => {
    casper.waitUntilVisible('.js-current-city', () => {
      const form = {}
      form[page.selectors.firstNameInput] = 'Liz'
      form[page.selectors.lastNameInput] = 'Lemon'
      form[page.selectors.emailInput] = 'liz.lemon@tgs.com'
      form[page.selectors.postcodeInput] = '30Rock'
      form[page.selectors.descriptionInput] = 'offer description'
      casper.fillSelectors(page.selectors.form, form, true)

      casper.capture('./captures/offer-items/filled-in-form.png')
    })
  })

  casper.then(() => {
    casper.waitUntilVisible(page.selectors.successTitle, () => {
      tests.onFormSubmitted.forEach(t => t(test))
      casper.capture('./captures/offer-items/submitted.png')
    })
  })

  casper.run(() => {
    test.done()
  })
})
