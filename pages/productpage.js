export class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.locator('a.btn.btn-success');
  }

  async addToCartAndAcceptAlert() {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.addToCartButton.click();
    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();
    return message;
  }
}
