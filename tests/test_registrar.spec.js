const { test, expect } = require('@playwright/test');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { SignUp } = require('../pages/sign_up');

test.describe('Registrar usuario desde la base de datos', () => {
    test('Registrar usuario usando datos de la base de datos', async ({ page }) => {
        const dbPath = path.join(__dirname, '../scripts/data/customer.db');
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) console.error('Error al abrir la base de datos:', err);
        });

        const getUserFromDB = () => {
            return new Promise((resolve, reject) => {
                db.get('SELECT username, password FROM customers LIMIT 1', (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                });
            });
        };

        const user = await getUserFromDB();
        expect(user).toBeTruthy(); // Verificar que se obtuvo un usuario

        const signUp = new SignUp(page);
        await signUp.goToLogin();
        await signUp.registrar(user.username, user.password);

        db.close((err) => {
            if (err) console.error('Error cerrando la base de datos:', err);
        });
    });
});