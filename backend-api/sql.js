const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pizza.db');

// ==========================================
// 🍕 ÁREA DE TREINAMENTO SQL DA PRISCILA 🍕
// ==========================================

// ESCREVA O SEU COMANDO SQL DENTRO DAS ASPAS ABAIXO:
const comandoSQL = "SELECT * FROM orders";

// ==========================================

db.all(comandoSQL, [], (err, rows) => {
    if (err) {
        console.error("❌ Erro de SQL: " + err.message);
        return;
    }
    console.log("\n📊 RESULTADO DO BANCO DE DADOS:\n");
    console.table(rows);
});
