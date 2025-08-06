const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');

test.describe('E2E Tests for Automation Exercise', () => {
  let loginPage;
  let productsPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
  });

  test('Login Test', async ({ page }) => {
    await loginPage.navigateToLoginSignup();
    await loginPage.login('test@example.com', 'password123');
    await expect(loginPage.loggedInAsUser).toBeVisible();
  });

  test('Add Products to Cart', async ({ page }) => {
    await loginPage.navigateToLoginSignup();
    await loginPage.login('test@example.com', 'password123');
    
    await page.goto('/');
    await productsPage.navigateToProducts();
    await productsPage.addProductToCart('Blue Top');
    await productsPage.addProductToCart('Men Tshirt');
    await productsPage.navigateToCart();

    const productsInCart = await cartPage.getProductNamesInCart();
    expect(productsInCart).toContain('Blue Top');
    expect(productsInCart).toContain('Men Tshirt');
    expect(productsInCart.length).toBe(2);
  });
});
