/* feedreader.js - Test suite
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
   // Test if feeds variable is defined & not empty
  describe('RSS Feeds', function() {
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // Get feed URLs
    const URLs = allFeeds.map(feed => feed.url);
    // Function to check if feed URLs defined & not empty strings
    function testUrls(url) {
      it('should be defined and not empty', function() {
        expect(url).toBeDefined();
        expect(url.length).not.toBe(0);
      });
    }
    // Call function on all feed URLs
    for (let i = 0; i < URLs.length; i++) {
      testUrls(URLs[i]);
    }

    // Get feed names
    const feedNames = allFeeds.map(feed => feed.name);
    // Function to check if feed names defined & not empty strings
    function testNames(name) {
      it('should be defined and not empty', function() {
        expect(name).toBeDefined();
        expect(name.length).not.toBe(0);
      });
    }
    // Call function on all feed names
    for (let i = 0; i < feedNames.length; i++) {
      testNames(feedNames[i]);
    }

});


  /* Test for default hiding of menu & visibility changes on hamburger click  */
  describe('The menu', function() {
    // get body element
    let body;
    beforeEach(() => {
      body = document.getElementsByTagName('body')[0];
    });

    // check if menu hidden
    it('should be hidden by default', function() {
      expect(body.classList).toContain('menu-hidden');
    })

    // check if menu visibility toggles on menu icon click
    it('should change visibility on menu icon click', function() {
      const menuIcon = document.getElementsByClassName('menu-icon-link')[0];
      menuIcon.click();
      expect(body.classList).not.toContain('menu-hidden');
      menuIcon.click();
      expect(body.classList).toContain('menu-hidden');
    });
  });

  /* Test for loading feed entries on initial feedload */
  describe('Initial Entries', function() {
    // initial load of first feed
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    // check if at least one feed entry defined
    it('should have at least one entry', function(done) {
      const feed = document.getElementsByClassName('feed')[0];
      const entryLink = feed.getElementsByClassName('entry-link')[0];
      const entry = entryLink.getElementsByClassName('entry')[0];
      expect(entry).toBeDefined();
      done();
    })

  });

  /* Test for actual content changes on feed load */
  describe('New Feed Selection', function() {
    let entriesBefore;
    let entriesAfter;

    beforeEach(function(done) {
      // empty feed
      const feed = document.getElementsByClassName('feed')[0];
      while (feed.firstChild) {
        feed.removeChild(feed.firstChild);
      }
      // get articles after loading first feed...
      loadFeed(0, function() {
        const feed1 = document.getElementsByClassName('feed')[0];
        entriesBefore = Array.from(feed1.getElementsByTagName('h2')).map(entry => entry.innerHTML);
      });
      // ...and get them after second feed loads, to compare the two
      loadFeed(1, function() {
        const feed2 = document.getElementsByClassName('feed')[0];
        entriesAfter = Array.from(feed2.getElementsByTagName('h2')).map(entry => entry.innerHTML);
        done();
      });

    });

    it('should change on menu item click', function(done) {
      expect(entriesBefore).not.toEqual(entriesAfter)
      done();
    });

  });

}());
