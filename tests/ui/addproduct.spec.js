import { test, expect } from '../data/product_fixture.js';

test('Flujo E2E productos', async ({ homePage, productPage }) => {
  const productName = 'Samsung galaxy s6';

  await homePage.goto();
  await homePage.selectProduct(productName);

  const alertMessage = await productPage.addToCartAndAcceptAlert();

  expect(alertMessage).toBe('Product added.');
});
