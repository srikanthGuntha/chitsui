describe('Simple Automation testing for Chits UI', function() {
 it('Should browse pages in csChits', function() {
 	browser.get('http://cschits.herokuapp.com');
    browser.sleep(4000);
    var AF = element(by.className('main-title'));
    var scrollIntoView = function () {
    arguments[0].scrollIntoView();
    };
    browser.executeScript(scrollIntoView, AF);
    browser.sleep(4000);
    var nav = element(by.className('top-bar-logo'));
    var scrollIntoView = function () {
    arguments[0].scrollIntoView();
    };
    browser.executeScript(scrollIntoView, nav);
    browser.sleep(4000);
  });

 it('Should navigate to how it works page', function() {
    element(by.linkText('HOW IT WORKS')).click();
    browser.sleep(4000);
    var buttonChit = element(by.className('btn-chit'));
    var scrollIntoView = function () {
    arguments[0].scrollIntoView();
    };
    browser.executeScript(scrollIntoView, buttonChit);
    browser.sleep(4000);
    var AF = element(by.className('top-bar-logo'));
    var scrollIntoView = function () {
    arguments[0].scrollIntoView();
    };
    browser.executeScript(scrollIntoView, AF);
    browser.sleep(4000);
  });

  it('Should navigate to join page', function() {
    element(by.linkText('JOIN US')).click();
    browser.sleep(4000);
    var buttonCreate = element(by.className('btn-create'));
    var scrollIntoView = function () {
    arguments[0].scrollIntoView();
    };
    browser.executeScript(scrollIntoView, buttonCreate);
    browser.sleep(4000);
    var AF = element(by.className('top-bar-logo'));
    var scrollIntoView = function () {
    arguments[0].scrollIntoView();
    };
    browser.executeScript(scrollIntoView, AF);
    browser.sleep(4000);
  });

  it('Should navigate to Groups page', function() {
    element(by.linkText('GROUPS')).click();
    browser.sleep(8000);
  });

  it('Should navigate to about us page', function() {
    element(by.linkText('ABOUT US')).click();
    browser.sleep(4000);
    var video = element(by.className('embed-responsive embed-responsive-16by9'));
    var scrollIntoView = function () {
    arguments[0].scrollIntoView();
    };
    browser.executeScript(scrollIntoView, video);
    browser.sleep(5000);
    var AF = element(by.className('top-bar-logo'));
    var scrollIntoView = function () {
    arguments[0].scrollIntoView();
    };
    browser.executeScript(scrollIntoView, AF);
    browser.sleep(4000);
  });

  it('Should navigate to contact us page', function() {
    element(by.linkText('CONTACT US')).click();
    browser.sleep(4000);
    var video = element(by.className('btn-contact'));
    var scrollIntoView = function () {
    arguments[0].scrollIntoView();
    };
    browser.executeScript(scrollIntoView, video);
    browser.sleep(5000);
    var AF = element(by.className('top-bar-logo'));
    var scrollIntoView = function () {
    arguments[0].scrollIntoView();
    };
    browser.executeScript(scrollIntoView, AF);
    browser.sleep(4000);
  });

  it('Should navigate to login page', function() {
    element(by.linkText('LOGIN/ REGISTER')).click();
    browser.sleep(4000);
  });
});