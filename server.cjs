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
    user: process.env.DB_USER || "admin",
    host: process.env.DB_HOST || "127.0.0.1",
    database: process.env.DB_NAME || "asdpemat",
    password: process.env.DB_PASSWORD || "admin",
    port: process.env.DB_PORT || 5432,
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// 🔹 Configuração do multer para upload de imagens
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

// 🔐 Middleware de autenticação
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

// 🔹 Função para salvar histórico de edições
const saveHistory = async (table, id_column, id_value, content, image, edited_by) => {
    try {
        const historyTable = `${table}_versions`;
        await pool.query(
            `INSERT INTO ${historyTable} (${id_column}, previous_content, previous_image_url, edited_by, edited_at)
             VALUES ($1, $2, $3, $4, NOW())`,
            [id_value, content, image, edited_by]
        );
    } catch (err) {
        console.error(`Erro ao salvar histórico em ${historyTable}:`, err);
    }
};

// 🔹 Função para buscar conteúdo de uma seção com histórico
const getSectionContent = async (req, res, table) => {
    try {
        const result = await pool.query(`SELECT * FROM ${table} ORDER BY updated_at DESC LIMIT 1`);
        const history = await pool.query(`SELECT * FROM ${table}_versions ORDER BY edited_at DESC`);
        res.json({ content: result.rows.length ? result.rows[0] : {}, history: history.rows });
    } catch (err) {
        console.error(`Erro ao buscar ${table}:`, err);
        res.status(500).send(`Erro ao buscar ${table}`);
    }
};

// 🔹 Função para atualizar conteúdo da seção
const updateSectionContent = async (req, res, table, id_column) => {
    const { content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!content) {
        return res.status(400).json({ error: "Conteúdo é obrigatório." });
    }

    try {
        const lastEntry = await pool.query(`SELECT id, content, image_url FROM ${table} ORDER BY updated_at DESC LIMIT 1`);

        if (lastEntry.rows.length > 0) {
            const { id, content: oldContent, image_url: oldImage } = lastEntry.rows[0];

            await saveHistory(table, id_column, id, oldContent, oldImage, req.user.id);

            await pool.query(`UPDATE ${table} SET content = $1, image_url = $2, updated_at = NOW() WHERE id = $3`,
                [content, image || oldImage, id]);
            res.json({ message: `${table} atualizado com sucesso!` });
        } else {
            await pool.query(`INSERT INTO ${table} (content, image_url, updated_at) VALUES ($1, $2, NOW())`,
                [content, image]);
            res.json({ message: `${table} criado com sucesso!` });
        }
    } catch (err) {
        console.error(`Erro ao atualizar ${table}:`, err);
        res.status(500).send(`Erro ao atualizar ${table}`);
    }
};

// 🔹 Rotas para cada seção com histórico e upload de imagens
const sections = [
    { path: "quem-somos", table: "quem_somos" },
    { path: "servicos", table: "servicos" },
    { path: "presidencia", table: "presidencia" },
    { path: "ferramentas", table: "ferramentas" },
    { path: "faq", table: "faq" },
    { path: "ajuda", table: "ajuda" },
    { path: "associese", table: "associese" }
];

sections.forEach(({ path, table }) => {
    app.get(`/api/${path}`, async (req, res) => await getSectionContent(req, res, table));
    app.post(`/api/${path}`, authMiddleware, upload.single("image"), async (req, res) => await updateSectionContent(req, res, table, "id"));
});

// 🔹 Rotas para gerenciamento de notícias
app.get("/api/news", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM news ORDER BY created_at DESC");
        res.json(result.rows);
    } catch (err) {
        console.error("Erro ao buscar notícias:", err);
        res.status(500).send("Erro ao buscar notícias");
    }
});

app.post("/api/news", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const result = await pool.query(
            "INSERT INTO news (title, content, image_url, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
            [title, content, image]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Erro ao adicionar notícia:", err);
        res.status(500).send("Erro ao adicionar notícia");
    }
});

app.put("/api/news/:id", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

        const oldNews = await pool.query("SELECT * FROM news WHERE id = $1", [id]);
        if (oldNews.rows.length > 0) {
            await saveHistory("news", "news_id", id, oldNews.rows[0].content, oldNews.rows[0].image_url, req.user.id);

            await pool.query(
                "UPDATE news SET title = $1, content = $2, image_url = $3 WHERE id = $4",
                [title, content, image, id]
            );

            res.json({ message: "Notícia atualizada com sucesso!" });
        } else {
            res.status(404).send("Notícia não encontrada.");
        }
    } catch (err) {
        console.error("Erro ao editar notícia:", err);
        res.status(500).send("Erro ao editar notícia");
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

// 🔹 Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
