const { setHeadlessWhen } = require('@codeceptjs/configure');
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './health_checks/*_check.js',
  output: './output',
  helpers: {
    Playwright: {
      url: process.env.PROD_PAGE_URL,
      show: true,
      browser: 'chromium',
      waitForTimeout: 10000,
    }
  },
  include: { },
  name: 'e2e'
}
