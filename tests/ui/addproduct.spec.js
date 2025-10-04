import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductPage } from '../pages/productPage';

test('Flujo end2end', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  const productName = 'Samsung galaxy s6';

  await homePage.goto();

  await homePage.selectProduct(productName);

  const alertMessage = await productPage.addToCartAndAcceptAlert();

  expect(alertMessage).toBe('Product added.');
});
