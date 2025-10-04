export class HomePage {
  constructor(page) {
    this.page = page;
    this.productLink = (productName) => `//a[text()="${productName}"]`; // XPath
    this.nextButton = '#next2'; // ID del botón Next
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async selectProduct(productName) {
    let found = false;

    while (!found) {

      const productLocator = this.page.locator(`xpath=${this.productLink(productName)}`);
      if (await productLocator.count() > 0) {
        await productLocator.first().click();
        found = true;
      } else {

        const nextButton = this.page.locator(this.nextButton);
        if (await nextButton.isVisible()) {
          await nextButton.click();
          await this.page.waitForLoadState('networkidle');
        } else {
          throw new Error(`Producto "${productName}" no encontrado en ninguna página`);
        }
      }
    }
  }
}



