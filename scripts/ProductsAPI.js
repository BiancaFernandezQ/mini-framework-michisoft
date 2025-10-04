// scripts/ProductsAPI.js
export class ProductsAPI {
  constructor(request) {
    this.request = request;
    this.baseUrl = 'https://api.demoblaze.com';
  }
 
  async getProductsByCategory(category) {
    return this.request.post(`${this.baseUrl}/bycat`, { data: { cat: category } });
  }
}