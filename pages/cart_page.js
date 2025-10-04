import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('#cartur');
    this.rows = page.locator('tr.success');
    this.totalPrice = page.locator('#totalp');
    this.deleteButton = (productName) =>
      page.locator(`tr:has-text("${productName}") a:has-text("Delete")`);
    this.placeOrderButton = page.locator('button[data-target="#orderModal"]');
    this.placeOrderBtn = page.locator("button[data-target='#orderModal']");

  }

  async openCart() {
    await this.cartLink.click();
    await expect(this.rows.first()).toBeVisible();
  }

  async getProductNames() {
    return this.rows.locator('td:nth-child(2)').allTextContents();
  }

  async validateProductInCart(productName) {
    await expect(this.page.locator(`td:has-text("${productName}")`)).toBeVisible();
  }

  async validateTotalPrice() {
    return parseInt(await this.totalPrice.textContent(), 10);
  }

  async deleteProduct(productName) {
    await this.deleteButton(productName).click();
  }

  async clickPlaceOrder() {
    await this.placeOrderBtn.click();
  }
}