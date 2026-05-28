describe('Pizza Order Registration - Cypress', () => {
  it('should fill the form and submit successfully', () => {
    // 1. Acessa a página principal (definida no baseUrl do cypress.config.js)
    cy.visit('/');

    // 2. Verifica o título da página
    cy.title().should('match', /Antigravity Pizza/);

    // 3. Preenche o nome do cliente
    cy.get('#customerName').type('Priscila da Silva');

    // 4. Seleciona o sabor da pizza (calabresa)
    cy.get('#pizzaFlavor').select('calabresa');

    // 5. Seleciona o tamanho da pizza (Grande)
    cy.contains('label', 'Large').click();

    // 6. Clica no botão de checkout
    cy.get('#submitOrderBtn').click();

    // 7. Preenche os dados de pagamento
    cy.get('#cardNumber').type('1234 5678 9101 1121');
    cy.get('#cardExpiry').type('12/30');
    cy.get('#cardCvv').type('123');

    // 8. Confirma o pagamento
    cy.get('#submitPaymentBtn').click();

    // 9. Verifica se a mensagem de sucesso está visível
    cy.get('#success-message').should('be.visible');

    // 10. Valida os dados do resumo do pedido
    cy.get('#summary-name').should('have.text', 'Priscila da Silva');
    cy.get('#summary-flavor').should('have.text', 'Brazilian Calabresa Pizza');
    cy.get('#summary-size').should('have.text', 'Large');
  });

  it('should prevent payment if card details are empty', () => {
    cy.visit('/');

    // 1. Preenche o formulário do pedido
    cy.get('#customerName').type('John Tester');
    cy.get('#pizzaFlavor').select('margherita');
    cy.contains('label', 'Medium').click();
    cy.get('#submitOrderBtn').click();

    // 2. Garante que o formulário de pagamento está visível
    cy.get('#payment-form').should('be.visible');

    // 3. Tenta confirmar sem preencher os dados
    cy.get('#submitPaymentBtn').click();

    // 4. Garante que a mensagem de sucesso NÃO apareceu
    cy.get('#success-message').should('not.be.visible');

    // 5. O formulário de pagamento continua visível
    cy.get('#payment-form').should('be.visible');
  });
});
