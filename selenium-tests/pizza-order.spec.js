const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function runPizzaOrderTest() {
  console.log('Iniciando o navegador com Selenium...');
  // 1. Inicializa o driver do Chrome (o Selenium Manager baixa o driver automaticamente se necessário!)
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // 2. Acessa a página principal
    console.log('Navegando para o site...');
    await driver.get('http://localhost:5173');

    // Verifica o título da página
    let title = await driver.getTitle();
    console.log(`Título da página: "${title}"`);
    assert.match(title, /Antigravity Pizza/);

    // 3. Preenche o nome do cliente
    console.log('Preenchendo nome do cliente...');
    await driver.findElement(By.id('customerName')).sendKeys('Priscila da Silva');

    // 4. Seleciona o sabor da pizza (calabresa)
    console.log('Selecionando sabor calabresa...');
    let flavorDropdown = await driver.findElement(By.id('pizzaFlavor'));
    await flavorDropdown.findElement(By.css("option[value='calabresa']")).click();

    // 5. Seleciona o tamanho da pizza (Grande)
    console.log('Selecionando tamanho Grande (Large)...');
    let largeRadio = await driver.findElement(By.css("input[value='large']"));
    // Para clicar de forma segura em elementos customizados, usamos o executeScript
    await driver.executeScript("arguments[0].click();", largeRadio);

    // 6. Clica no botão de checkout
    console.log('Clicando em Checkout...');
    await driver.findElement(By.id('submitOrderBtn')).click();

    // 7. Preenche os dados de pagamento (Aguardando o formulário de pagamento aparecer)
    console.log('Aguardando formulário de pagamento e preenchendo os dados...');
    await driver.wait(until.elementLocated(By.id('cardNumber')), 5000);
    await driver.findElement(By.id('cardNumber')).sendKeys('1234 5678 9101 1121');
    await driver.findElement(By.id('cardExpiry')).sendKeys('12/30');
    await driver.findElement(By.id('cardCvv')).sendKeys('123');

    // 8. Confirma o pagamento
    console.log('Confirmando pagamento...');
    await driver.findElement(By.id('submitPaymentBtn')).click();

    // 9. Aguarda e verifica se a mensagem de sucesso está visível
    console.log('Verificando mensagem de sucesso...');
    let successMsgElement = await driver.findElement(By.id('success-message'));
    await driver.wait(until.elementIsVisible(successMsgElement), 5000);
    
    // 10. Valida os dados do resumo do pedido no sucesso
    let summaryName = await driver.findElement(By.id('summary-name')).getText();
    let summaryFlavor = await driver.findElement(By.id('summary-flavor')).getText();
    let summarySize = await driver.findElement(By.id('summary-size')).getText();

    assert.strictEqual(summaryName, 'Priscila da Silva');
    assert.strictEqual(summaryFlavor, 'Brazilian Calabresa Pizza');
    assert.strictEqual(summarySize, 'Large');

    console.log('🎉 TESTE CONCLUÍDO COM SUCESSO NO SELENIUM!');

  } catch (error) {
    console.error('❌ Falha no teste:', error);
  } finally {
    // 11. Fecha o navegador
    console.log('Fechando o navegador...');
    await driver.quit();
  }
}

runPizzaOrderTest();
