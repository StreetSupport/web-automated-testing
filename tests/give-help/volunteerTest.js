// /* global phantom, casper */
// const pages = require('../pages')

// casper.test.setUp(function () {
//   const Browser = require('../browser')
//   const browser = new Browser(phantom)

//   browser.setLocation('manchester')
// })

// casper.test.begin('Volunteer', 4, function suite (test) {

//   casper.start(pages.volunteer.url, () => {
//     casper.wait(10000, () => {
//       console.log('waited 10 seconds')
//     })
//   })

//   casper.then(() => {
//     casper.capture('./captures/volunteer/initial-load.png')
//     test.assertTitle('Volunteer - Street Support')
//     test.assertExists('#js-form', 'Form is available')
//     test.assertNotVisible('#js-fail h2')
//     test.assertNotVisible('#js-success h2')
//   })

//   casper.then(() => {
//     casper.waitUntilVisible('.js-current-city', () => {
//       casper.fillSelectors('form#js-form', {
//         'input#firstname': 'Liz',
//         'input#lastname': 'Lemon',
//         'input#email': 'liz-lemon@tgs.com',
//         'input#postcode': 'm3 1FY'
//       }, true)

//       casper.capture('./captures/volunteer/filled-in-form.png')
//     })
//   })

//   casper.then(() => {
//     casper.waitUntilVisible('#js-success', () => {
//       test.assertNotVisible('#js-form')
//       test.assertNotVisible('#js-fail h2')
//       test.assertSelectorHasText('#js-success h2', 'Thank you for submitting your details!', 'Thank you message appears')
//     }, () => { console.log('Success message did not appear') }, 10000)
//   })

//   casper.run(() => {
//     test.done()
//   })
// })
