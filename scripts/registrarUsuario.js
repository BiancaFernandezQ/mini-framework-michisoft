// ...existing code...
const sqlite3 = require('sqlite3').verbose();
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

faker.locale = 'es';

const dbPath = path.join(__dirname, 'data', 'customer.db');

if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error al abrir la base de datos:', err);
});

db.serialize(() => {
    // Crear tabla sin coma final
    db.run(`CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creando la tabla:', err);
            return;
        }

        // Limpiar datos existentes
        db.run(`DELETE FROM customers`, (errDel) => {
            if (errDel) console.error('Error eliminando filas:', errDel);

            // Insertar datos falsos
            const stmt = db.prepare(`INSERT INTO customers (username, password) VALUES (?, ?)`);
            for (let i = 0; i < 10; i++) {
                stmt.run(
                    faker.person.firstName() + Date.now(),
                    faker.person.lastName(),
                    (errRun) => {
                        if (errRun) console.error('Error insertando fila:', errRun);
                    }
                );
            }
            stmt.finalize((errFinal) => {
                if (errFinal) console.error('Error finalizando el statement:', errFinal);
                console.log('Base de datos poblada correctamente.');
                db.close((errClose) => {
                    if (errClose) console.error('Error cerrando la base de datos:', errClose);
                });
            });
        });
    });
});
// ...existing code...