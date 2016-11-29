const pages = require('./pages')

const Browser = function (phantom) {
  if (!phantom.cookiesEnabled) throw 'Cookies not enabled'

  this.setLocation = (location) => {
    phantom.addCookie({
      domain: pages.domain,
      name: 'desired-location',
      value: 'manchester'
    })
    //casper.echo('Start callback has cookie: ' + JSON.stringify(phantom.cookies))
  }
}

module.exports = Browser
