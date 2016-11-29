'use strict';

var local = 'http://localhost:3000/';
var ci = 'https://dev-web-streetsupport.azurewebsites.net/';
var root = local;

var pages = {
  home: {
    url: root
  },
  volunteer: {
    url: root + 'give-help/volunteer/'
  }
};

module.exports = pages;