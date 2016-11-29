'use strict';

var local = 'http://localhost:3000/';
var ci = 'https://dev-web-streetsupport.azurewebsites.net/';
var root = local;

var pages = {
  home: {
    url: root
  },
  volunteer: {
    url: root + 'give-help/volunteer/',
    selectors: {
      title: '.block__header',
      form: 'form#js-form',
      successTitle: '#js-success h2',
      failTitle: '#js-fail h2',
      firstNameInput: 'input#firstname',
      lastNameInput: 'input#lastname',
      emailInput: 'input#email',
      postcodeInput: 'input#postcode'
    }
  }
};

module.exports = pages;