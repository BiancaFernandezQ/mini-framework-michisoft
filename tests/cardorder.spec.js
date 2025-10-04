// tests/cart.spec.js
const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/place.order.page.js');

test('Realizar orden desde el carrito', async ({ page }) => {
  const cartPage = new CartPage(page);

  // Ir al carrito
  await page.goto('https://www.demoblaze.com/cart.html');

  // Hacer click en "Place Order"
  await cartPage.clickPlaceOrder();

  // Llenar formulario
  await cartPage.fillOrderForm({
    name: 'Maria',
    country: 'Bolivia',
    city: 'La Paz',
    card: '1234567890123456',
    month: '10',
    year: '2025'
  });

  // Enviar orden
  await cartPage.submitOrder();

  // Validar confirmación
  await expect(cartPage.confirmationModal).toBeVisible();

  // Confirmar
  await cartPage.confirmOrder();
});

