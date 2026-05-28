import { test, expect } from '@playwright/test';
import { PizzaOrderPage } from '../pages/PizzaOrderPage';

test.describe('Pizza Order Registration (POM Version)', () => {
  test('should fill the form and submit successfully', async ({ page }) => {
    // 1. Inicializamos o nosso "Mapa da Página"
    const pizzaPage = new PizzaOrderPage(page);

    // 2. Acessamos o site
    await pizzaPage.goto();

    // 3. Preenchemos o pedido de uma vez só! (Veja como fica limpo)
    await pizzaPage.fillOrderForm('Priscila da Silva', 'calabresa', 'Large');
    await pizzaPage.submitOrder();

    // 4. Preenchemos os dados de entrega
    await pizzaPage.fillDeliveryDetails('Star Avenue', '123', 'Orbit City', '(11) 99999-9999');
    await pizzaPage.confirmOrder();

    // 5. Validamos o sucesso e o resumo do pedido
    await pizzaPage.verifySuccessMessageIsVisible();
    await pizzaPage.verifySummaryData('Priscila da Silva', 'Brazilian Calabresa Pizza', 'Large');
  });

  test('should prevent order if delivery details are empty', async ({ page }) => {
    const pizzaPage = new PizzaOrderPage(page);

    await pizzaPage.goto();

    // Tenta fazer o pedido sem endereço
    await pizzaPage.fillOrderForm('John Tester', 'margherita', 'Medium');
    await pizzaPage.submitOrder();

    // Garante que o formulário de entrega apareceu
    await pizzaPage.verifyPaymentFormIsVisible();

    // Tenta confirmar com os campos em branco
    await pizzaPage.confirmOrder();

    // Valida que a mensagem de sucesso NÃO apareceu
    await pizzaPage.verifySuccessMessageIsHidden();
    await pizzaPage.verifyPaymentFormIsVisible();
  });
});
