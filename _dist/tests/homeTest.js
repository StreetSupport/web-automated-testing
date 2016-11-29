'use strict';

/* global casper, phantom */
var pages = require('../pages');
var Browser = require('../browser');

casper.test.begin('Home', function (test) {
  new Browser(phantom).setLocation('manchester');
  casper.start(pages.home.url, function () {
    casper.capture('./captures/home/initial-load.png');
    test.assertSelectorHasText('.block__header', 'Street Support in Manchester');
  });

  casper.run(function () {
    test.done();
  });
});