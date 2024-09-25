const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const initDB = require('./init-db'); // Importa o script para inicializar o banco de dados
const authRoutes = require('./routes/auth'); // Roteador de autenticação
const homeRoutes = require('./routes/home'); // Roteador da home

dotenv.config();

// Inicializa o banco de dados
initDB();

// Configurações
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Rota inicial
app.get('/', (req, res) => {
    res.redirect('/auth/login'); // Redireciona para a página de login
});

// Rotas
app.use('/auth', authRoutes); // Rotas de autenticação
app.use('/home', homeRoutes);   // Rotas da tela de home

// Porta do servidor
const PORT = process.env.PORT || 3772;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
