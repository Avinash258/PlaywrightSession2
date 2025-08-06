const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { TestDataGenerator } = require('../utils/TestDataGenerator');

test.describe('User Registration and Login Tests', () => {
  let loginPage;
  let testDataGenerator;
  let userData;

  test.beforeAll(async () => {
    testDataGenerator = new TestDataGenerator();
    userData = testDataGenerator.generateUserData();
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('should register a new user', async ({ page }) => {
    await loginPage.completeRegistration(userData);
    await expect(loginPage.accountCreatedMessage).toBeVisible();
  });

  test('should login with registered user', async ({ page }) => {
    await loginPage.navigateToLoginSignup();
    await loginPage.login(userData.email, userData.password);
    const username = await loginPage.getLoggedInUserName();
    expect(username).toContain(userData.firstName);
  });

  test('should fail login with incorrect credentials', async ({ page }) => {
    await loginPage.navigateToLoginSignup();
    await loginPage.login('wrong@email.com', 'wrongpassword');
    const errorMessage = await loginPage.verifyLoginError();
    expect(errorMessage).toBe('Your email or password is incorrect!');
  });
});
