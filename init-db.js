const sqlite3 = require('sqlite3').verbose();

const initDB = () => {
    const db = new sqlite3.Database('./database/login.db');

    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL,
            password TEXT NOT NULL
        )`);
    });

    db.close();
};

module.exports = initDB; // Exporta a função
