exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_PASSWORD",
  key: process.env.BROWSERSTACK_PASSWORD || "BROWSERSTACK_ACC_KEY",

  updateJob: false,
  specs: ["./tests/specs/single.test.js"],
  exclude: [],

  capabilities: require("../capabilities"),

  logLevel: "warn",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: "hub-cloud.browserstack.com",

  before: function () {
    var chai = require("chai");
    global.expect = chai.expect;
    chai.Should();
  },
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  // Code to mark the status of test on BrowserStack based on the assertion status
  afterTest: function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (passed) {
      browser.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}'
      );
    } else {
      browser.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}'
      );
    }
  },
};
