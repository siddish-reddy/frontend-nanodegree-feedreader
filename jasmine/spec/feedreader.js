/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {

        /* to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are valid', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toMatch('http://')
            });
        });

        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are valid', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    describe("The menu", function() {
        /* a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function() {
            //since it is in hidden state now it should show menu
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // now again menu should be hided if clicked again
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    describe("Intial Entries", function() {

        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('after loadFeed execution at least a single .entry is in .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });


    describe("New Feed Selection", function() {
        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var newEntry;
        var newHeader;
        var prevHeader;
        var prevEntry;

        beforeEach(function(done) {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000; // Because of slow internet connection I have to make sure two feeds are loaded timeout is doubled.
            loadFeed(0, function() {
                prevHeader = $('.header-title').text();
                prevEntry = $('.feed .entry')[0];
                loadFeed(1, function() {
                    newHeader = $('.header-title').text();
                    newEntry = $('.feed .entry')[0];
                    done();
                })
            })
        });
        // Thanks to the reviewer for suggesting better way.

        it("ensures feed is loaded by loadFeed and content is changed", function() {
            expect(newHeader).not.toBe(prevHeader);
            expect(newEntry).not.toBe(prevEntry);
            expect($('.header-title').text()).toBe(allFeeds[1].name);
        });

        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
        })
    });
}());