Feature('Authentication health check');

Scenario('User can login via google but not with username/pass', ({ I }) => {
  I.amOnPage('/')
  I.click('Log in')
  I.waitForText('Continue with Google')
  I.dontSeeElement('input[name=username]')
});
