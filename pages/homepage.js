export class HomePage {
  constructor(page) {
    this.page = page;
    this.productLink = (productName) => `//a[text()="${productName}"]`;
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async selectProduct(productName) {
    await this.page.click(this.productLink(productName));
  }
}

