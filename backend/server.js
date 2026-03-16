// Arquivo: /backend/server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Rota de Notícias (Função Core)
app.get('/api/news', (req, res) => {
    res.json([
        { id: 1, title: "Lançamento OmniNews", content: "Conteúdo completo...", date: new Date() }
    ]);
});

// Middleware de Erro (Função de Estabilidade)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erro interno no servidor OmniCore');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
