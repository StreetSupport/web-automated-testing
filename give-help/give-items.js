casper.test.begin('Check page copy appears', 3, function suite(test) {
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

    /*casper.then(function() {
        test.assertTitle("casperjs - Google Search", "google title is ok");
        test.assertUrlMatch(/q=casperjs/, "search term has been submitted");
        test.assertEval(function() {
            return __utils__.findAll("h3.r").length >= 10;
        }, "google search for \"casperjs\" retrieves 10 or more results");
    });*/

    casper.run(function() {
        test.done();
    });
});
