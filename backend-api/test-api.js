async function runTests() {
    console.log("==================================================");
    console.log("🚀 INICIANDO TESTES DE API (Simulando o Postman)");
    console.log("==================================================\n");

    // TESTE 1
    console.log("👉 Passo 1: Enviando Caminho Feliz (Pedido Completo)...");
    let response1 = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName: "Priscila da Silva", flavor: "calabresa", size: "large" })
    });
    console.log("✅ STATUS RECEBIDO: " + response1.status + (response1.status === 201 ? " (Created)" : ""));
    console.log("📦 RESPOSTA: " + JSON.stringify(await response1.json()) + "\n");

    // TESTE 2
    console.log("👉 Passo 2: Enviando Pedido SEM NOME...");
    let response2 = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flavor: "pepperoni", size: "medium" })
    });
    console.log("✅ STATUS RECEBIDO: " + response2.status + (response2.status === 400 ? " (Bad Request)" : ""));
    console.log("📦 RESPOSTA: " + JSON.stringify(await response2.json()) + "\n");

    // TESTE 3
    console.log("👉 Passo 3: Enviando Pedido SEM SABOR (Procurando o Bug)...");
    let response3 = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName: "João Tester", size: "small" })
    });
    console.log("🐛 STATUS RECEBIDO: " + response3.status + (response3.status === 201 ? " (Created - ISSO É UM BUG!)" : ""));
    console.log("📦 RESPOSTA: " + JSON.stringify(await response3.json()) + "\n");
    
    console.log("==================================================");
    console.log(" FIM DOS TESTES! A API ACEITOU UMA PIZZA SEM SABOR!");
    console.log("==================================================");
}

runTests();
