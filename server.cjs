const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || "secreto";

const pool = new Pool({
    user: "admin",
    host: "127.0.0.1",
    database: "asdpemat",
    password: "admin",
    port: 5432,
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads/";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Acesso negado." });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ error: "Token inválido" });
    }
};

// 🔓 Rota para obter seções dinâmicas do site
app.get("/api/sections", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM sections ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        console.error("Erro ao buscar seções:", err);
        res.status(500).send("Erro ao buscar seções");
    }
});

// 🔐 Criar ou atualizar conteúdo de uma seção
app.post("/api/sections", authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    try {
        const existing = await pool.query("SELECT * FROM sections WHERE title = $1", [title]);
        if (existing.rowCount > 0) {
            await pool.query("UPDATE sections SET content = $1 WHERE title = $2", [content, title]);
        } else {
            await pool.query("INSERT INTO sections (title, content) VALUES ($1, $2)", [title, content]);
        }
        res.json({ message: "Seção salva com sucesso!" });
    } catch (err) {
        console.error("Erro ao salvar seção:", err);
        res.status(500).send("Erro ao salvar seção");
    }
});

// 🔐 Excluir uma seção
app.delete("/api/sections/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM sections WHERE id = $1", [id]);
        res.json({ message: "Seção removida com sucesso!" });
    } catch (err) {
        console.error("Erro ao excluir seção:", err);
        res.status(500).send("Erro ao excluir seção");
    }
});

// 🔐 Login de usuário
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length === 0) return res.status(400).send("Usuário não encontrado");

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Senha incorreta");

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        console.error("Erro no login:", err);
        res.status(500).send("Erro no servidor");
    }
});

// 🔓 Servidor iniciado
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
