exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.placeOrderBtn = page.locator("button[data-target='#orderModal']");
    this.nameInput = page.locator("#name");
    this.countryInput = page.locator("#country");
    this.cityInput = page.locator("#city");
    this.cardInput = page.locator("#card");
    this.monthInput = page.locator("#month");
    this.yearInput = page.locator("#year");
    this.purchaseBtn = page.locator("button:has-text('Purchase')");
    this.confirmationModal = page.locator(".sweet-alert");
    this.okBtn = page.locator("button.confirm");
  }

  async clickPlaceOrder() {
    await this.placeOrderBtn.click();
  }

  async fillOrderForm({ name, country, city, card, month, year }) {
    await this.nameInput.fill(name);
    await this.countryInput.fill(country);
    await this.cityInput.fill(city);
    await this.cardInput.fill(card);
    await this.monthInput.fill(month);
    await this.yearInput.fill(year);
  }

  async submitOrder() {
    await this.purchaseBtn.click();
  }

  async confirmOrder() {
    await this.okBtn.click();
  }
};

