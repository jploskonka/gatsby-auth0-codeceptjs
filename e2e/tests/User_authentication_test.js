Feature('User authentication');

// URLs that will be used in tests. I don't like using URLs directly in tests,
// for both readability and changeability
const rootUrl = '/'
const afterLoginUrl = '/'
const afterLogoutUrl = '/'

// I'll need to have some user credentials to test authentication with. This may
// differ in dev/test environments so will be provided as environment variables
const user = {
  login: process.env.TEST_USER_LOGIN,
  pass: process.env.TEST_USER_PASS
}

// In real world this function would either live in custom steps file, or in
// some page object file. For this example I'll keep it here.
const login = async (I, user) => {
  const acceptBtn = `button[value=accept]`

  I.click(`Log in`)
  I.fillField(`username`, user.login)
  I.fillField(`password`, secret(user.pass))
  I.click(`Continue`)

  // when user logs in for the first time with Auth0 account, they need to
  // authorize the app to access their account.
  const needsAuthorization = await I.grabNumberOfVisibleElements(acceptBtn) > 0
  if (needsAuthorization) { I.click(acceptBtn) }

  I.waitForText(`Log out`) // wait for page to load
}

// Scenario messages in such a test are perfect documentation of the project.
// Don't be afraid to get verbose here.
Scenario(`User logs in and lands on ${afterLoginUrl} page.`, async ({ I }) => {
  I.amOnPage(rootUrl)
  await login(I, user)

  I.see(user.login)
  I.seeCurrentUrlEquals(afterLoginUrl)
})

// One may say let's have this as one scenario where a user logs in, then logs
// out. It could work out, but if such a scenario fails it's hard to identify
// which part is broken.
Scenario(`User logs out and lands on ${afterLogoutUrl}`, async ({ I }) => {
  I.amOnPage(rootUrl)
  await login(I, user)

  I.click(`Log out`)
  I.waitForText(`Log in`)
  I.seeCurrentUrlEquals(afterLogoutUrl)
  I.dontSee(user.login)
})
