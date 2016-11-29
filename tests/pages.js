const local = 'http://localhost:3000/'
const ci = 'https://dev-web-streetsupport.azurewebsites.net/'
let root = local

const pages = {
  home: {
    url: root
  },
  volunteer: {
    url: root + 'give-help/volunteer/'
  }
}

module.exports = pages
