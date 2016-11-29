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
}

module.exports = pages
