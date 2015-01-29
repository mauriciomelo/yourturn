'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /countdown when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/countdown");
  });


  describe('countdown', function() {

    beforeEach(function() {
      browser.get('index.html#/countdown');
    });


    it('should render countdown when user navigates to /countdown', function() {
      expect(element(by.id('timer')).isPresent()).toBe(true);
    });

  });

});
