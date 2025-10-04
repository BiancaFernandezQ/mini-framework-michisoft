import { test, expect } from '@playwright/test';
import { ProductsAPI } from '../../scripts/ProductsAPI';

test.describe('API - Productos por categoría', () => {
  let api;

  test.beforeEach(async ({ request }) => {
    api = new ProductsAPI(request);
  });


test(' Obtener productos por categoría (Monitors)', async () => { //? ToDo: no harcodear  JHESS
    const response = await api.getProductsByCategory('monitor');
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toHaveProperty('Items');
    expect(Array.isArray(body.Items)).toBeTruthy();
    expect(body.Items.length).toBeGreaterThan(0);

    console.log("Productos en categoría 'monitor':");
    body.Items.forEach(p => console.log(`- ${p.title}`));
  });
});