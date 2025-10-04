import { test, expect } from "@playwright/test";
import { ProductPage } from "../../pages/ProductPage";
import { CardPage } from "../../pages/CardPage";

test.describe("Pruebas del carrito en DemoBlaze", () => {

  test("Agregar producto y validar en carrito", async ({ page }) => {
    const productPage = new ProductPage(page);
    const cardPage = new CardPage(page);

    await page.goto("https://www.demoblaze.com/");

    await productPage.selectProduct("Samsung galaxy s6");
    await productPage.addToCart();

    await cardPage.openCart();

    await cardPage.validateProductInCart("Samsung galaxy s6");
    await cardPage.validateTotalPrice();
  });