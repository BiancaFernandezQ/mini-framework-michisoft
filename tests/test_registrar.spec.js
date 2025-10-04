const { test, expect } = require('@playwright/test');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { SignUp } = require('../pages/sign_up');
import { ProductPage } from "../pages/productpage";
import { CartPage } from "../pages/cart_page";
import { LoginPage } from '../pages/login_page';
import { HomePage } from '../pages/homepage';
import { PlaceOrderPage } from '../pages/place.order.page';
import { generateOrderData } from '../utils/orderData';

test.describe('Registrar usuario desde la base de datos', () => {
    let db;
    const dbPath = path.join(__dirname, '../scripts/data/customer.db');

    test.beforeAll(() => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Error al abrir la base de datos:', err);
        });
    });

    test.afterAll(() => {
        db.close((err) => {
            if (err) console.error('Error cerrando la base de datos:', err);
        });
    });

    test('Registrar usuario usando datos de la base de datos', async ({ page }) => {
        //! REGISTRO - BIANCA
        const signUp = new SignUp(page);

        const getUserFromDB = () => {
            return new Promise((resolve, reject) => {
                db.get('SELECT username, password FROM customers ORDER BY RANDOM() LIMIT 1', (err, row) => {  //? ToDo: VARIAR EN USUARIOS MARIA 
                    if (err) reject(err);
                    resolve(row);
                });
            });
        };

        const user = await getUserFromDB();
        expect(user).toBeTruthy(); 

        await signUp.goToLogin();
        await signUp.registrar(user.username, user.password);

        //!LOGIN - DANI
        let loginPage;
        loginPage = new LoginPage(page);
        await loginPage.login(user.username, user.password);
        await expect(loginPage.list_products).toBeVisible(); 

        //! SELECCIONAR PRODUCTO - CARO
        async function addProductToCart(page, productName) {
        let homePage = new HomePage(page);
        await homePage.selectProduct(productName);
        let productPage = new ProductPage(page);
        const alertMessage = await productPage.addToCartAndAcceptAlert();

        expect(alertMessage).toBe('Product added.');
        }

        test('Agregar producto al carrito', async ({ page }) => {
        const productName = process.env.PRODUCT_NAME; 
        await addProductToCart(page, productName);
        });

        //! CART - GUADA
        const cartPage = new CartPage(page);
        await cartPage.openCart();

        await cartPage.validateProductInCart(productName);
        await cartPage.validateTotalPrice();

        //! PLACEHOLDER - MARIA
        await cartPage.clickPlaceOrder();
        const placeOrderPage = new PlaceOrderPage(page);

        const orderData = generateOrderData(); 
        await placeOrderPage.fillOrderForm(orderData);

        await placeOrderPage.submitOrder();

        await expect(placeOrderPage.confirmationModal).toBeVisible();

        await placeOrderPage.confirmOrder();
    });
});