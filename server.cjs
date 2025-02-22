const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Configurar a conexão com PostgreSQL
const pool = new Pool({
    user: 'admin',
    host: '127.0.0.1',
    database: 'asdpemat',
    password: 'admin',
    port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());

// Criar tabelas necessárias
pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        image TEXT,
        link TEXT
    );
    CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT
    );
    CREATE TABLE IF NOT EXISTS members (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT
    );
    CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key TEXT NOT NULL,
        value TEXT
    );
`, (err) => {
    if (err) {
        console.error('Erro ao criar tabelas:', err);
    } else {
        console.log('Tabelas criadas com sucesso');

        // Criar usuário administrador padrão, se não existir
        const adminPassword = bcrypt.hashSync('admin', 8);
        pool.query('SELECT * FROM users WHERE username = $1', ['admin'], (err, result) => {
            if (err) {
                console.error('Erro ao verificar usuário administrador:', err);
            } else if (result.rows.length === 0) {
                pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['admin', adminPassword], (err) => {
                    if (err) {
                        console.error('Erro ao criar usuário administrador:', err);
                    } else {
                        console.log('Usuário administrador criado com sucesso');
                    }
                });
            }
        });
    }
});

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Token não fornecido' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Token inválido' });
    }
};

// Rota de login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(400).send('Usuário não encontrado');
        }

        const user = result.rows[0];

        // Comparar a senha informada com o hash no banco
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send('Senha incorreta');
        }

        // Gerar token JWT para autenticação
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

        res.send({ token });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).send('Erro no servidor');
    }
});

// Função genérica para obter dados
const getData = (table) => async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM ${table}`);
        res.json(result.rows);
    } catch (err) {
        console.error(`Erro ao buscar ${table}:`, err);
        res.status(500).send(`Erro ao buscar ${table}`);
    }
};

// Função genérica para inserir dados
const insertData = (table, columns) => async (req, res) => {
    try {
        const values = columns.map(col => req.body[col]);
        const result = await pool.query(
            `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${columns.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`,
            values
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(`Erro ao adicionar em ${table}:`, err);
        res.status(500).send(`Erro ao adicionar em ${table}`);
    }
};

// Aplicando as funções genéricas para as rotas
app.get('/api/news', authMiddleware, getData('news'));
app.post('/api/news', authMiddleware, insertData('news', ['title', 'image', 'link']));

app.get('/api/services', authMiddleware, getData('services'));
app.post('/api/services', authMiddleware, insertData('services', ['name', 'description']));

app.get('/api/members', authMiddleware, getData('members'));
app.post('/api/members', authMiddleware, insertData('members', ['name', 'role']));

app.get('/api/settings', authMiddleware, getData('settings'));
app.post('/api/settings', authMiddleware, insertData('settings', ['key', 'value']));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
