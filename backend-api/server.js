const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database('./pizza.db', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Database connected!');
        db.run(`CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customerName TEXT,
            flavor TEXT,
            size TEXT
        )`);
    }
});

// GET route to view all orders (to practice SQL SELECT visually)
app.get('/api/orders', (req, res) => {
    db.all("SELECT * FROM orders", [], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
            return;
        }
        res.status(200).json({
            "message": "success",
            "data": rows
        });
    });
});

// POST route to create a new order (The API Endpoint to test)
app.post('/api/orders', (req, res) => {
    const { customerName, flavor, size } = req.body;

    // Validation: Customer Name is required
    if (!customerName) {
        return res.status(400).json({ "error": "Bad Request: customerName is required." });
    }

    // Validation: Size is required
    if (!size) {
        return res.status(400).json({ "error": "Bad Request: size is required." });
    }

    // 🐛 BUG INTENCIONAL AQUI: O desenvolvedor esqueceu de validar o "flavor" (sabor)!
    // A API vai aceitar e salvar no banco uma pizza sem sabor (status 201).
    // O QA deve descobrir isso testando no Postman e reportar no Jira.

    const sql = 'INSERT INTO orders (customerName, flavor, size) VALUES (?,?,?)';
    const params = [customerName, flavor, size];
    
    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ "error": "Internal Server Error: " + err.message });
        }
        res.status(201).json({
            "message": "Order Created Successfully!",
            "orderId": this.lastID
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Cozinha (API) rodando na porta ${PORT}...`);
});
