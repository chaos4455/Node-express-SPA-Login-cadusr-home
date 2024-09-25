const express = require('express');
const router = express.Router();

// Rota para a tela de home
router.get('/', (req, res) => {
    // Aqui você pode substituir 'Nome do Usuário' por uma variável real de sessão ou banco de dados
    const userName = 'Nome do Usuário'; // Exemplo de nome do usuário, você deve substituir isso pela lógica correta
    res.render('home', { userName }); // Renderiza a tela de home
});

module.exports = router;
