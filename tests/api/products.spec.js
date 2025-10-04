import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.demoblaze.com';

const categorias = ['phone', 'notebook', 'monitor'];
const productIds = [1, 2, 3, 4, 5]; 

/* test.describe('API - Productos de Demoblaze', () => {

  test('Listar todos los productos', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log(data);
  });


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
 */
productIds.forEach(id => {
    test(`Detalle de producto con ID ${id}`, async ({ request }) => {
      const response = await request.post(`${BASE_URL}/view`, {
        data: { id: id.toString() } 
      });
      expect(response.status()).toBe(200);

      const product = await response.json();
      console.log(product);

      expect(product).toHaveProperty('id', id); 
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
    });
  });
  categorias.forEach(categoria => {
    test(`Obtener productos por categoría: ${categoria}`, async ({ request }) => {
      const response = await request.post(`${BASE_URL}/bycat`, {
        data: { cat: categoria }
      });
      expect(response.status()).toBe(200);

      const body = await response.json();
      console.log(`Categoría: ${categoria}`, body);

      expect(body).toHaveProperty('Items');
      expect(Array.isArray(body.Items)).toBeTruthy();
      expect(body.Items.length).toBeGreaterThan(0);

      body.Items.forEach(item => {
        expect(item).toHaveProperty('cat', categoria);
      });
    });
  });


