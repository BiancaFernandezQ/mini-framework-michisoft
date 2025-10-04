import { test, expect } from '@playwright/test';

const BASE_URL = 'https://fakestoreapi.com';

const productIds = [1, 2, 3, 4, 5]; 

test.describe('API - Productos de Demoblaze', () => {

  test('Listar todos los productos', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log(data);
  });

//comment
  productIds.forEach(id => {
    test(`Detalle de producto con ID ${id}`, async ({ request }) => {
      const response = await request.get(`${BASE_URL}/products/${id}`);
      expect(response.status()).toBe(200);

      const product = await response.json();
      console.log(product);

     
      expect(product).toHaveProperty('id', id);
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
    });
  });

});
