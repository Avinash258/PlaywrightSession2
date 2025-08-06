const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('#cart_info .cart_info tbody tr');
    this.proceedToCheckoutButton = page.getByRole('link', { name: 'Proceed To Checkout' });
  }

  async getProductNamesInCart() {
    return await this.cartItems.locator('.cart_description a').allTextContents();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}

module.exports = { CartPage };
