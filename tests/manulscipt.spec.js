// @ts-check
import { test, expect } from '@playwright/test';

test('Automation Exercise Login Test', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://automationexercise.com/');
  
  // Click on Signup/Login link
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  
  // Verify login section is visible
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  
  // Fill in login form
  //await page.getByPlaceholder('Email Address').fill('avi@gmail.com');
  await page.locator('xpath=/html/body/section/div/div/div[1]/div/form/input[2]').click();
  await page.getByPlaceholder('Password').fill('password123');
  
  // Click login button
  await page.getByRole('button', { name: 'Login' }).click();
});

test('Demo Web Shop Login Test', async ({ page }) => {
  // Navigate to demo web shop
  await page.goto('https://demowebshop.tricentis.com/login');
  
  // Verify page title
  await expect(page).toHaveTitle('Demo Web Shop. Login');
  
  // Verify logo is visible
  await expect(page.getByTitle('Return to home page')).toBeVisible();
  
  // Fill in login form
  await page.getByLabel('Email:').fill('test@example.com');
  await page.getByLabel('Password:').fill('password123');
  
  // Click remember me checkbox
  await page.getByLabel('Remember me?').check();
  
  // Verify login button is visible and enabled
  const loginButton = page.getByRole('button', { name: 'Log in' });
  await expect(loginButton).toBeEnabled();
  
  // Click login button
  await loginButton.click();
});
