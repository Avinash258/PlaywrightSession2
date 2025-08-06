const { expect } = require('@playwright/test');

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.productsGrid = page.locator('.features_items');
    this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async navigateToProducts() {
    await this.productsLink.click();
    await expect(this.productsGrid).toBeVisible();
  }

  async addProductToCart(productName) {
    const productCard = this.page.locator('.product-image-wrapper').filter({ hasText: productName });
    await productCard.hover();
    await productCard.getByRole('button', { name: 'Add to cart' }).click();
    await expect(this.continueShoppingButton).toBeVisible();
    await this.continueShoppingButton.click();
  }

  async navigateToCart() {
    await this.viewCartLink.click();
    await expect(this.page).toHaveURL(/.*view_cart/);
  }
}

module.exports = { ProductsPage };
