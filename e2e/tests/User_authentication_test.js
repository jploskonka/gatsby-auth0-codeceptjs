Feature('User authentication');

// URLs that will be used in tests. I don't like using URLs directly in tests, for both readability and changeability reasons
const rootUrl = '/'
const afterLoginUrl = '/'
const afterLogoutUrl = '/'

// I'll need to have some user credentials to test authentication with. This may differ in dev/test environments so will be provided as environment variables
const user = {
  login: process.env.TEST_USER_LOGIN,
  pass: process.env.TEST_USER_PASS
}

// Scenario messages in such a test are perfect documentation of the project. Don't be afraid to get verbose here.
Scenario(`User logs in and lands on ${afterLoginUrl} page.`, ({ I }) => {
  I.amOnPage(rootUrl)
  I.click(`Log in`)
  I.fillField(`username`, user.login)
  I.fillField(`password`, secret(user.pass))
  I.click(`Continue`)

  I.waitForText(user.login)
  I.seeInCurrentUrl(afterLoginUrl)
})

// One may say let's have this as one scenario where a user logs in, then logs out. It could work out, but if such a scenario fails it's hard to identify which part is broken.
Scenario(`User logs out and lands on ${afterLogoutUrl}`, ({ I }) => {
  I.amOnPage(rootUrl)
	I.click(`Log in`)
  I.fillField(`username`, user.login)
  I.fillField(`password`, secret(user.pass))
  I.click(`Continue`)

  I.waitForText(`Log out`)
  I.click(`Log out`)
  I.waitForText(`Log in`)
  I.seeCurrentUrlEquals(afterLogoutUrl)
  I.dontSee(user.login)
})
