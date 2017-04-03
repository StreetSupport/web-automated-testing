/* global phantom, casper */

const pages = require('./pages')
const page = pages.volunteer
const Browser = require('./browser')

import { ScreenCapture } from '/screen-capture'
const cap = new ScreenCapture('volunteer', casper)

const tests = {
  onLoad: [
    (test) => test.assertSelectorHasText(page.selectors.title, 'Volunteer'),
    (test) => test.assertTitle('Volunteer - Street Support'),
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

casper.test.begin('Volunteers', totalTests, function (test) {
  new Browser(phantom).setLocation('manchester')
  casper.start(page.url, function () {
    cap.snapshot('initial-load')
    tests.onLoad.forEach(t => t(test))
  })

  casper.then(() => {
    casper.waitUntilVisible('.js-current-city', () => {
      const form = {}
      form[page.selectors.firstNameInput] = 'Liz'
      form[page.selectors.lastNameInput] = 'Lemon'
      form[page.selectors.emailInput] = 'liz.lemon@tgs.com'
      form[page.selectors.postcodeInput] = '30Rock'
      casper.fillSelectors(page.selectors.form, form, true)

      cap.snapshot('filled-in-form')
    })
  })

  casper.then(() => {
    casper.waitUntilVisible(page.selectors.successTitle, () => {
      tests.onFormSubmitted.forEach(t => t(test))
      cap.snapshot('submitted')
    })
  })

  casper.run(() => {
    test.done()
  })
})
