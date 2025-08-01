// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);
});

test('Click on SignUp', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  // Click the get started link.
  //await page.getByRole('link', { name: 'Get started' }).click();
  await page.locator("xpath=//*[contains(text(),'Signup')]").click();

  // Expects page to have a heading with the name of Installation.
  //await expect(page.getByRole('heading', { name: 'New User Signup' })).toBeVisible();
  await expect(page.locator("xpath=//h2[contains(text(),'New User Signup!')]")).toBeVisible();
});
