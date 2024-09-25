const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = new sqlite3.Database('./database/login.db');

// Rota para exibir a página de login
router.get('/login', (req, res) => {
    res.render('login'); // Renderiza a página de login
});

// Rota para exibir a página de registro
router.get('/register', (req, res) => {
    res.render('register'); // Renderiza a página de registro
});

// Rota de Registro
router.post('/register', (req, res) => {
    const { name, email, phone, password } = req.body;

    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao acessar o banco de dados.' });
        }
        if (row) {
            return res.status(400).json({ message: 'Email já cadastrado.' });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao criar a senha.' });
            }

            db.run("INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)", [name, email, phone, hash], function (err) {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao registrar o usuário.' });
                }
                
                res.redirect('https://www.google.com'); // Redireciona após cadastro
            });
        });
    });
});

// Rota de Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao acessar o banco de dados.' });
        }
        if (!row) {
            return res.status(400).json({ message: 'Usuário não encontrado.' });
        }

        bcrypt.compare(password, row.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao comparar a senha.' });
            }
            if (result) {
                const token = jwt.sign({ id: row.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                
                res.redirect('https://www.google.com'); // Redireciona após login
            } else {
                return res.status(400).json({ message: 'Senha incorreta.' });
            }
        });
    });
});

module.exports = router;
