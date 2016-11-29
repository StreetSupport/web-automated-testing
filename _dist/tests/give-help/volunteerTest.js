'use strict';

/* global phantom, casper */

var pages = require('../pages');
var page = pages.volunteer;
var Browser = require('../browser');

var tests = {
  onLoad: [function (test) {
    return test.assertSelectorHasText(page.selectors.title, 'Volunteer');
  }, function (test) {
    return test.assertTitle('Volunteer - Street Support');
  }, function (test) {
    return test.assertExists(page.selectors.form, 'Form is available');
  }, function (test) {
    return test.assertNotVisible(page.selectors.failTitle);
  }, function (test) {
    return test.assertNotVisible(page.selectors.successTitle);
  }],
  onFormSubmitted: [function (test) {
    return test.assertNotVisible(page.selectors.form);
  }, function (test) {
    return test.assertNotVisible(page.selectors.failTitle);
  }, function (test) {
    return test.assertSelectorHasText(page.selectors.successTitle, 'Thank you for submitting your details!', 'Thank you message appears');
  }]
};

var totalTests = tests.onLoad.length + tests.onFormSubmitted.length;

casper.test.begin('Volunteers', totalTests, function (test) {
  new Browser(phantom).setLocation('manchester');
  casper.start(page.url, function () {
    casper.capture('./captures/volunteer/initial-load.png');
    tests.onLoad.forEach(function (t) {
      return t(test);
    });
  });

  casper.then(function () {
    casper.waitUntilVisible('.js-current-city', function () {
      var form = {};
      form[page.selectors.firstNameInput] = 'Liz';
      form[page.selectors.lastNameInput] = 'Lemon';
      form[page.selectors.emailInput] = 'liz.lemon@tgs.com';
      form[page.selectors.postcodeInput] = '30Rock';
      casper.fillSelectors(page.selectors.form, form, true);

      casper.capture('./captures/volunteer/filled-in-form.png');
    });
  });

  casper.then(function () {
    casper.waitUntilVisible(page.selectors.successTitle, function () {
      tests.onFormSubmitted.forEach(function (t) {
        return t(test);
      });
      casper.capture('./captures/volunteer/submitted.png');
    });
  });

  casper.run(function () {
    test.done();
  });
});