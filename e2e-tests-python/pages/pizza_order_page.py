from playwright.sync_api import Page, expect

class PizzaOrderPage:
    def __init__(self, page: Page):
        self.page = page
        
        # Mapeando os Locators com seletores Fortes e por ID
        self.customer_name_input = page.locator('#customerName')
        self.pizza_flavor_select = page.locator('#pizzaFlavor')
        self.submit_order_btn = page.locator('#submitOrderBtn')
        
        self.delivery_street_input = page.locator('#deliveryStreet')
        self.delivery_number_input = page.locator('#deliveryNumber')
        self.delivery_neighborhood_input = page.locator('#deliveryNeighborhood')
        self.contact_phone_input = page.locator('#contactPhone')
        self.submit_payment_btn = page.locator('#submitPaymentBtn')
        
        self.success_message = page.locator('#success-message')
        self.payment_form = page.locator('#payment-form')

    # 1. Acessar a página inicial
    def goto(self):
        self.page.goto('http://localhost:5173/')

    # 2. Preencher o formulário da pizza
    def fill_order_form(self, name: str, flavor: str, size: str):
        self.customer_name_input.fill(name)
        self.pizza_flavor_select.select_option(flavor)
        # Para o tamanho da pizza, clicamos no label que contém o texto exato
        self.page.locator('label').filter(has_text=size).click()

    # 3. Clicar no botão de Checkout
    def submit_order(self):
        self.submit_order_btn.click()

    # 4. Preencher os detalhes de entrega
    def fill_delivery_details(self, street: str, number: str, neighborhood: str, phone: str):
        self.delivery_street_input.fill(street)
        self.delivery_number_input.fill(number)
        self.delivery_neighborhood_input.fill(neighborhood)
        self.contact_phone_input.fill(phone)

    # 5. Confirmar o pedido
    def confirm_order(self):
        self.submit_payment_btn.click()

    # --- Validações (Assertions) ---

    def verify_success_message_is_visible(self):
        expect(self.success_message).to_be_visible()

    def verify_success_message_is_hidden(self):
        expect(self.success_message).to_be_hidden()

    def verify_payment_form_is_visible(self):
        expect(self.payment_form).to_be_visible()

    def verify_summary_data(self, name: str, flavor_formatted: str, size: str):
        expect(self.page.locator('#summary-name')).to_have_text(name)
        expect(self.page.locator('#summary-flavor')).to_have_text(flavor_formatted)
        expect(self.page.locator('#summary-size')).to_have_text(size)
