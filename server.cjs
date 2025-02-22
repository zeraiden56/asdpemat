const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'your_secret_key';

// Configurar a conexão com PostgreSQL
const pool = new Pool({
    user: 'your_postgres_user',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_postgres_password',
    port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());

// Criar tabelas necessárias
pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
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
`, (err, res) => {
    if (err) {
        console.error('Erro ao criar tabelas:', err);
    } else {
        console.log('Tabelas criadas com sucesso');
    }
});

// Criar usuário administrador padrão
const hashedPassword = bcrypt.hashSync('admin', 8);
pool.query('INSERT INTO users (username, password) VALUES ($1, $2) ON CONFLICT DO NOTHING', ['admin', hashedPassword], (err, res) => {
    if (err) {
        console.error('Erro ao criar usuário administrador:', err);
    } else {
        console.log('Usuário administrador criado com sucesso');
    }
});

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

// Rota de login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    pool.query('SELECT * FROM users WHERE username = $1', [username], async (err, result) => {
        const user = result.rows[0];
        if (err || !user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id }, SECRET_KEY);
        res.send({ token });
    });
});

// Rotas protegidas
app.get('/api/news', authMiddleware, (req, res) => {
    pool.query('SELECT * FROM news', (err, result) => {
        if (err) {
            res.status(500).send('Erro ao buscar notícias');
            return;
        }
        res.json(result.rows);
    });
});

app.post('/api/news', authMiddleware, (req, res) => {
    const { title, image, link } = req.body;
    pool.query('INSERT INTO news (title, image, link) VALUES ($1, $2, $3) RETURNING *', [title, image, link], (err, result) => {
        if (err) {
            res.status(500).send('Erro ao adicionar notícia');
            return;
        }
        res.json(result.rows[0]);
    });
});

app.get('/api/services', authMiddleware, (req, res) => {
    pool.query('SELECT * FROM services', (err, result) => {
        if (err) {
            res.status(500).send('Erro ao buscar serviços');
            return;
        }
        res.json(result.rows);
    });
});

app.post('/api/services', authMiddleware, (req, res) => {
    const { name, description } = req.body;
    pool.query('INSERT INTO services (name, description) VALUES ($1, $2) RETURNING *', [name, description], (err, result) => {
        if (err) {
            res.status(500).send('Erro ao adicionar serviço');
            return;
        }
        res.json(result.rows[0]);
    });
});

app.get('/api/members', authMiddleware, (req, res) => {
    pool.query('SELECT * FROM members', (err, result) => {
        if (err) {
            res.status(500).send('Erro ao buscar membros');
            return;
        }
        res.json(result.rows);
    });
});

app.post('/api/members', authMiddleware, (req, res) => {
    const { name, role } = req.body;
    pool.query('INSERT INTO members (name, role) VALUES ($1, $2) RETURNING *', [name, role], (err, result) => {
        if (err) {
            res.status(500).send('Erro ao adicionar membro');
            return;
        }
        res.json(result.rows[0]);
    });
});

app.get('/api/settings', authMiddleware, (req, res) => {
    pool.query('SELECT * FROM settings', (err, result) => {
        if (err) {
            res.status(500).send('Erro ao buscar configurações');
            return;
        }
        res.json(result.rows);
    });
});

app.post('/api/settings', authMiddleware, (req, res) => {
    const { key, value } = req.body;
    pool.query('INSERT INTO settings (key, value) VALUES ($1, $2) RETURNING *', [key, value], (err, result) => {
        if (err) {
            res.status(500).send('Erro ao adicionar configuração');
            return;
        }
        res.json(result.rows[0]);
    });
});

// Rota para exportar o banco de dados para um arquivo
app.get('/api/export', (req, res) => {
    const exportDb = new sqlite3.Database('exported.db');
    exportDb.serialize(() => {
        pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'", (err, result) => {
            if (err) {
                res.status(500).send('Erro ao exportar banco de dados');
                return;
            }
            const tables = result.rows.map(row => row.table_name);
            tables.forEach(table => {
                exportDb.run(`CREATE TABLE IF NOT EXISTS ${table} AS SELECT * FROM ${table} WHERE 0`);
                pool.query(`SELECT * FROM ${table}`, (err, result) => {
                    if (err) {
                        res.status(500).send('Erro ao exportar banco de dados');
                        return;
                    }
                    result.rows.forEach(row => {
                        const columns = Object.keys(row).join(', ');
                        const values = Object.values(row).map(value => `'${value}'`).join(', ');
                        exportDb.run(`INSERT INTO ${table} (${columns}) VALUES (${values})`);
                    });
                });
            });
        });
    });
    res.send('Database exported');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});