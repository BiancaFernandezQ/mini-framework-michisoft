const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/place.order.page.js');

test('Realizar orden desde el carrito', async ({ page }) => {
  const cartPage = new CartPage(page);

  await page.goto('https://www.demoblaze.com/cart.html');

  await cartPage.clickPlaceOrder();

  await cartPage.fillOrderForm({
    name: 'Maria',
    country: 'Bolivia',
    city: 'La Paz',
    card: '1234567890123456',
    month: '10',
    year: '2025'
  });

  await cartPage.submitOrder();

  await expect(cartPage.confirmationModal).toBeVisible();

  await cartPage.confirmOrder();
});
