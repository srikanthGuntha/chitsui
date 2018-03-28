// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
// var SpecReporter = require('jasmine-spec-reporter');

// exports.config = {
//   allScriptsTimeout: 11000,
//   specs: [
//     './e2e/**/*.e2e-spec.ts'
//   ],
//   capabilities: {
//     'browserName': 'chrome'
//   },
//   directConnect: true,
//   baseUrl: 'http://localhost:4200/',
//   framework: 'jasmine',
//   jasmineNodeOpts: {
//     showColors: true,
//     defaultTimeoutInterval: 30000,
//     print: function() {}
//   },
//   useAllAngular2AppRoots: true,
//   beforeLaunch: function() {
//     require('ts-node').register({
//       project: 'e2e'
//     });
//   },
//   onPrepare: function() {
//     jasmine.getEnv().addReporter(new SpecReporter());
//   }
// };

exports.config = {
  directConnect: true,
  specs: ['ProtractorSpec.js'],
    capabilities: {
    browserName: 'chrome'
  },
    onPrepare: function(){
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;  
    browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(5000);
    browser.manage().timeouts().setScriptTimeout(60000);
  }
};