import pytest
from playwright.sync_api import Page
from pages.pizza_order_page import PizzaOrderPage

def test_should_fill_the_form_and_submit_successfully(page: Page):
    # 1. Inicializamos o nosso "Mapa da Página"
    pizza_page = PizzaOrderPage(page)

    # 2. Acessamos o site
    pizza_page.goto()

    # 3. Preenchemos o pedido de uma vez só! (Veja como fica limpo)
    pizza_page.fill_order_form('Priscila da Silva', 'calabresa', 'Large')
    pizza_page.submit_order()

    # 4. Preenchemos os dados de entrega
    pizza_page.fill_delivery_details('Star Avenue', '123', 'Orbit City', '(11) 99999-9999')
    pizza_page.confirm_order()

    # 5. Validamos o sucesso e o resumo do pedido
    pizza_page.verify_success_message_is_visible()
    pizza_page.verify_summary_data('Priscila da Silva', 'Brazilian Calabresa Pizza', 'Large')

def test_should_prevent_order_if_delivery_details_are_empty(page: Page):
    pizza_page = PizzaOrderPage(page)
    pizza_page.goto()

    # Tenta fazer o pedido sem endereço
    pizza_page.fill_order_form('John Tester', 'margherita', 'Medium')
    pizza_page.submit_order()

    # Garante que o formulário de entrega apareceu
    pizza_page.verify_payment_form_is_visible()

    # Tenta confirmar com os campos em branco
    pizza_page.confirm_order()

    # Valida que a mensagem de sucesso NÃO apareceu
    pizza_page.verify_success_message_is_hidden()
    pizza_page.verify_payment_form_is_visible()
