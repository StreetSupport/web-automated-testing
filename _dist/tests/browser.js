'use strict';

/* global casper */

var Browser = function Browser(phantom) {
  if (!phantom.cookiesEnabled) throw 'Cookies not enabled';

  this.setLocation = function (location) {
    phantom.addCookie({
      domain: 'localhost',
      name: 'desired-location',
      value: 'manchester'
    });
    //casper.echo('Start callback has cookie: ' + JSON.stringify(phantom.cookies))
  };
};

module.exports = Browser;