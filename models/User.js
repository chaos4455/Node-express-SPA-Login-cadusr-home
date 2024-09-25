const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/login.db');

// Criação da tabela de usuário
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);
});

const User = {
    create: (username, password, callback) => {
        const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
        db.run(query, [username, password], callback);
    },
    findByUsername: (username, callback) => {
        const query = `SELECT * FROM users WHERE username = ?`;
        db.get(query, [username], callback);
    }
};

module.exports = User;
