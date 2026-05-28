import { Page, Locator, expect } from '@playwright/test';

export class PizzaOrderPage {
  readonly page: Page;

  // --- Locators (Endereços dos elementos na tela) ---
  readonly customerNameInput: Locator;
  readonly pizzaFlavorSelect: Locator;
  readonly submitOrderBtn: Locator;
  readonly deliveryStreetInput: Locator;
  readonly deliveryNumberInput: Locator;
  readonly deliveryNeighborhoodInput: Locator;
  readonly contactPhoneInput: Locator;
  readonly submitPaymentBtn: Locator;
  readonly successMessage: Locator;
  readonly paymentForm: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Mapeando os Locators com seletores Fortes e por ID
    this.customerNameInput = page.locator('#customerName');
    this.pizzaFlavorSelect = page.locator('#pizzaFlavor');
    this.submitOrderBtn = page.locator('#submitOrderBtn');
    
    this.deliveryStreetInput = page.locator('#deliveryStreet');
    this.deliveryNumberInput = page.locator('#deliveryNumber');
    this.deliveryNeighborhoodInput = page.locator('#deliveryNeighborhood');
    this.contactPhoneInput = page.locator('#contactPhone');
    this.submitPaymentBtn = page.locator('#submitPaymentBtn');
    
    this.successMessage = page.locator('#success-message');
    this.paymentForm = page.locator('#payment-form');
  }

  // --- Ações (O que o robô faz) ---

  // 1. Acessar a página inicial
  async goto() {
    await this.page.goto('/');
  }

  // 2. Preencher o formulário da pizza
  async fillOrderForm(name: string, flavor: string, size: 'Small' | 'Medium' | 'Large') {
    await this.customerNameInput.fill(name);
    await this.pizzaFlavorSelect.selectOption(flavor);
    // Para o tamanho da pizza, clicamos no label que contém o texto exato
    await this.page.locator('label').filter({ hasText: size }).click();
  }

  // 3. Clicar no botão de Checkout
  async submitOrder() {
    await this.submitOrderBtn.click();
  }

  // 4. Preencher os detalhes de entrega
  async fillDeliveryDetails(street: string, number: string, neighborhood: string, phone: string) {
    await this.deliveryStreetInput.fill(street);
    await this.deliveryNumberInput.fill(number);
    await this.deliveryNeighborhoodInput.fill(neighborhood);
    await this.contactPhoneInput.fill(phone);
  }

  // 5. Confirmar o pedido
  async confirmOrder() {
    await this.submitPaymentBtn.click();
  }

  // --- Validações (Assertions) ---

  async verifySuccessMessageIsVisible() {
    await expect(this.successMessage).toBeVisible();
  }

  async verifySuccessMessageIsHidden() {
    await expect(this.successMessage).toBeHidden();
  }

  async verifyPaymentFormIsVisible() {
    await expect(this.paymentForm).toBeVisible();
  }

  async verifySummaryData(name: string, flavorFormatted: string, size: string) {
    await expect(this.page.locator('#summary-name')).toHaveText(name);
    await expect(this.page.locator('#summary-flavor')).toHaveText(flavorFormatted);
    await expect(this.page.locator('#summary-size')).toHaveText(size);
  }
}
