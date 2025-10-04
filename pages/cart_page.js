import { expect } from "@playwright/test";

export class CardPage {
  constructor(page) {
    this.page = page;

    this.cartLink = '#cartur';
    this.tableRows = 'tr.success'; 
    this.totalPrice = '#totalp';
    this.placeOrderBtn = 'button[data-target="#orderModal"]';
    this.deleteBtn = 'a:has-text("Delete")'; 
  }

  async openCart() {
    await this.page.click(this.cartLink);
    await expect(this.page.locator(this.tableRows).first()).toBeVisible();
  }

  async getProductRows() {
    return this.page.locator(this.tableRows);
  }

  async validateProductInCart(productName) {
    await expect(this.page.locator(`td:has-text("${productName}")`)).toBeVisible();
  }

  async validateTotalPrice() {
    const price = await this.page.textContent(this.totalPrice);
    expect(Number(price)).toBeGreaterThan(0);
  }

  async deleteProduct(productName) {
    const row = this.page.locator(`tr:has-text("${productName}")`);
    await expect(row).toBeVisible();
    await row.locator(this.deleteBtn).click();
  }

  async placeOrder(customer) {
    await this.page.click(this.placeOrderBtn);
    await this.page.fill('#name', customer.name);
    await this.page.fill('#country', customer.country);
    await this.page.fill('#city', customer.city);
    await this.page.fill('#card', customer.card);
    await this.page.fill('#month', customer.month);
    await this.page.fill('#year', customer.year);

    await this.page.click('button:has-text("Purchase")');
    await expect(this.page.locator('.sweet-alert')).toBeVisible();
  }
}
