import { expect } from '@playwright/test';

const BASE_URL = 'https://api.demoblaze.com';
const categorias = ['phone', 'notebook', 'monitor'];

export async function getRandomProduct(request) {
  let allProducts = [];

  for (const cat of categorias) {
    const response = await request.post(`${BASE_URL}/bycat`, { data: { cat } });
    expect(response.status()).toBe(200);
    const data = await response.json();
    allProducts = allProducts.concat(data.Items);
  }

  expect(allProducts.length).toBeGreaterThan(0);
  const randomIndex = Math.floor(Math.random() * allProducts.length);
  return allProducts[randomIndex];
}
