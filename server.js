const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Conexão com PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dbportfolio',
  password: '123456',
  port: 5432,
});

// Criar tabela automática (caso não exista)
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100),
      email VARCHAR(100),
      celular VARCHAR(50),
      mensagem TEXT,
      criado_em TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log("Tabela 'leads' pronta!");
})();

app.post('/api/lead', async (req, res) => {
  const { nome, email, celular, mensagem } = req.body;

  try {
    await pool.query(
      `INSERT INTO leads (nome, email, celular, mensagem)
       VALUES ($1, $2, $3, $4)`,
      [nome, email, celular, mensagem]
    );

    res.json({ mensagem: "Enviado e salvo no banco!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao salvar no banco." });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
