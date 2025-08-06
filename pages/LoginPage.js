const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    // Navigation
    this.signupLoginLink = page.getByRole('link', { name: ' Signup / Login' });
    
    // Login form elements
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    
    // Signup form elements
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    
    // Registration form elements
    this.titleMr = page.locator('#id_gender1');
    this.titleMrs = page.locator('#id_gender2');
    this.password = page.locator('#password');
    this.daySelect = page.locator('#days');
    this.monthSelect = page.locator('#months');
    this.yearSelect = page.locator('#years');
    this.newsletter = page.locator('#newsletter');
    this.specialOffers = page.locator('#optin');
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.company = page.locator('#company');
    this.address = page.locator('#address1');
    this.country = page.locator('#country');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.zipcode = page.locator('#zipcode');
    this.mobileNumber = page.locator('#mobile_number');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    
    // Messages and verifications
    this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
    this.signupHeading = page.getByRole('heading', { name: 'New User Signup!' });
    this.accountCreatedMessage = page.getByRole('heading', { name: 'ACCOUNT CREATED!' });
    this.loggedInAsUser = page.locator('a:has-text("Logged in as")');
    this.incorrectLoginMessage = page.locator('.login-form p[style*="color: red"]');
  }

  async navigateToLoginSignup() {
    await this.page.goto('https://automationexercise.com/');
    await this.signupLoginLink.click();
    await expect(this.loginHeading).toBeVisible();
    await expect(this.signupHeading).toBeVisible();
  }

  async login(email, password) {
    await expect(this.loginHeading).toBeVisible();
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async signup(name, email) {
    await expect(this.signupHeading).toBeVisible();
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async getLoggedInUserName() {
    const userText = await this.loggedInAsUser.textContent();
    return userText.replace('Logged in as ', '').trim();
  }

  async verifyLoginError() {
    await expect(this.incorrectLoginMessage).toBeVisible();
    const errorText = await this.incorrectLoginMessage.textContent();
    return errorText.trim();
  }

  async fillRegistrationForm(userData) {
    // Select title
    await this.titleMr.check();
    
    // Fill password
    await this.password.fill(userData.password);
    
    // Parse and fill birth date
    const birthDate = new Date(userData.birthDate);
    await this.daySelect.selectOption(birthDate.getDate().toString());
    await this.monthSelect.selectOption((birthDate.getMonth() + 1).toString());
    await this.yearSelect.selectOption(birthDate.getFullYear().toString());
    
    // Check newsletter and special offers
    await this.newsletter.check();
    await this.specialOffers.check();
    
    // Fill address information
    await this.firstName.fill(userData.firstName);
    await this.lastName.fill(userData.lastName);
    await this.company.fill(userData.company);
    await this.address.fill(userData.address);
    await this.country.selectOption('United States');
    await this.state.fill(userData.state);
    await this.city.fill(userData.city);
    await this.zipcode.fill(userData.zipcode);
    await this.mobileNumber.fill(userData.mobileNumber);
    
    // Create account
    await this.createAccountButton.click();
    
    // Verify account creation
    await expect(this.accountCreatedMessage).toBeVisible();
  }

  async completeRegistration(userData) {
    await this.navigateToLoginSignup();
    await this.signup(userData.firstName, userData.email);
    await this.fillRegistrationForm(userData);
  }
}

module.exports = { LoginPage };
