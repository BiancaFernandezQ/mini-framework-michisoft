import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductPage } from '../pages/productPage';

export const test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  }
});
