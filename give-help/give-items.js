casper.test.begin('Give items', 3, function suite(test) {
    casper.start("https://streetsupport.net/give-help/give-items/", function() {
        test.assertTitle("Requests for Help - Street Support");

        test.assertEvalEquals(function() {
            return __utils__.findOne('.block__header').textContent;
        },
            'Give',
            'main title appears'
        );

        test.assertEvalEquals(function() {
            return __utils__.findOne('.block__sub-header').textContent;
        },
            'Give items, money and time to meet current needs',
            'subtitle appears'
        );
    });

    casper.then(function() {
        casper.waitForSelector('#js-card-list', function(){
            test.assertExists('#js-card-list', 'Request listings appears');
        });

    });

    casper.run(function() {
        test.done();
    });
});
