import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ mensagem: "Método não permitido" });
  }

  const { nome, email, celular, mensagem } = req.body;

  try {
    // Cria a tabela se não existir
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

    // Insere o lead
    await pool.query(
      `INSERT INTO leads (nome, email, celular, mensagem)
       VALUES ($1, $2, $3, $4)`,
      [nome, email, celular, mensagem]
    );

    return res.status(200).json({ mensagem: "Enviado e salvo no banco!" });
  } catch (erro) {
    console.error("Erro ao salvar lead:", erro);
    return res.status(500).json({ mensagem: "Erro ao salvar no banco." });
  }
}
