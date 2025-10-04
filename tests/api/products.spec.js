import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.demoblaze.com';

const categorias = ['phone', 'notebook', 'monitor'];
const productIds = [1, 2, 3, 4, 5]; 


test('Simular listado de todos los productos', async ({ request }) => {
  let allProducts = [];

  for (const cat of categorias) {
    const response = await request.post(`${BASE_URL}/bycat`, { data: { cat } });
    expect(response.status()).toBe(200);

    const products = await response.json();
    allProducts = allProducts.concat(products.Items);
  }

  console.log('Todos los productos:', allProducts);
  expect(allProducts.length).toBeGreaterThan(0); 
});


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


