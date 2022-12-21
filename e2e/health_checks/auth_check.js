Feature('Authentication health check');

Scenario('User can login via google but not with username/pass', ({ I }) => {
  I.amOnPage('/')

  // I have no idea why, but sometimes the Log in button is already there
  // but it still has no click event attached to it and clicking does nothing.
  // This line seems to fix it, but I'm not really sure how.
  // Also this problem doesn't happen in tests, only in this health check 🤷‍♂️
  I.waitForText('Log in')

  I.click(`Log in`)
  I.waitForText('Continue with Google')
  I.dontSeeElement('input[name=username]')
});
