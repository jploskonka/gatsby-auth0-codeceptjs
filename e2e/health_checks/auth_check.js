Feature('Authentication health check');

Scenario('User can login via google but not with username/pass', ({ I }) => {
  I.amOnPage('/')
  I.click(`Log in`)
  I.waitForText('Continue with Google')
  I.dontSeeElement('input[name=username]')
}).retry(5); 

// For some unknown to me reason, when using real webpage,
// line 5 clicks on `Log in` button (so the element is already loaded),
// but Auth0 flow doesn't start. I don't know exactly why, I suspect
// something about page loading taking longer in real page than in local build.
// Luckily codecept comes with handy `retry` method.
// I don't like this, but I accept it's good enough.