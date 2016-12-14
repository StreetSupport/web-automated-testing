const local = 'http://localhost:3000/' // eslint-disable-line
const ci = 'https://dev-web-streetsupport.azurewebsites.net/' // eslint-disable-line
const uat = 'https://uat-web-streetsupport.azurewebsites.net/' // eslint-disable-line
const prod = 'https://streetsupport.net/' // eslint-disable-line
const root = ci
const domain = root.match(/^https?:\/\/(.*):?.*\/$/)[1]

const pages = {
  domain: domain,
  home: {
    url: root
  },
  offerItem: {
    url: root + 'give-help/offer-items/',
    selectors: {
      title: '.block__header',
      form: 'form#js-form',
      successTitle: '#js-success h2',
      failTitle: '#js-fail h2',
      firstNameInput: 'input[data-bind="textInput: firstName"]',
      lastNameInput: 'input[data-bind="textInput: lastName"]',
      emailInput: 'input[data-bind="textInput: email"]',
      postcodeInput: 'input[data-bind="textInput: postcode"]',
      descriptionInput: 'input[data-bind="textInput: description"]',
      otherCategory: 'input[data-bind="textInput: otherCategory"]'
    }
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
  },
  findHelpCategories: {
    url: root + 'find-help/',
    selectors: {
      categoryList: '.result-grid',
      categoryItem: '.cta',
      accommodationLink: 'a[href="category/?category=accom"]',
      findHelpTitle: '.block__header--find-help',
      serviceList: '.accordion__header',
      categoryLocationDropdown: '.js-find-help-dropdown',
      categoryRangeDropdown: '.js-find-help-range'
    }
  }
}

module.exports = pages
