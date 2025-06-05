const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname )));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'portfolio', 'index.html'));
});

// Criar uma rota GET para verificar o endpoint
app.get('/api/lead', (req, res) => {
    res.json({ mensagem: "Endpoint pronto para receber dados via POST." });
});


app.post('/api/lead', (req, res) => {
  const { nome, email, celular, mensagem } = req.body;
  console.log("Recebido lead:");
  console.log("Nome:", nome);
  console.log("E-mail:", email);
  console.log("Celular:", celular);
  console.log("Mensagem:", mensagem);
  res.json({ mensagem: "Lead recebido com sucesso!" });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});