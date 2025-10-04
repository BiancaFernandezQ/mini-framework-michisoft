import { test, expect } from '../data/product_fixture.js';
const { test, expect } = require('@playwright/test');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { SignUp } = require('../pages/sign_up');
import { expect } from "@playwright/test";
import { LoginPage } from "../../pages/login_page.js";
import { test } from "@playwright/test";

test.describe("Login Page", () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        console.log("Se ejecuta ANTES de cada test");
        loginPage = new LoginPage(page);
        await loginPage.goto();

    });

    test.afterEach(async () => {
        console.log("Se ejecuta DESPUÉS de cada test");
    });


    test("Validar que el loguin fue exitoso", async ({ page }) => {
        await loginPage.login("danielab", "1234");
        //Validar que la lista de productos está visible
        await expect(loginPage.products_list).toBeVisible();

    });


});

test('Flujo E2E productos', async ({ homePage, productPage }) => {

    const productName = 'Samsung galaxy s6';

    await homePage.goto();
    await homePage.selectProduct(productName);

    const alertMessage = await productPage.addToCartAndAcceptAlert();

    expect(alertMessage).toBe('Product added.');
});
