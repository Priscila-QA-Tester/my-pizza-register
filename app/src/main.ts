import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pizza-form') as HTMLFormElement;
  const paymentForm = document.getElementById('payment-form') as HTMLFormElement;
  const successMessage = document.getElementById('success-message') as HTMLDivElement;
  const newOrderBtn = document.getElementById('newOrderBtn') as HTMLButtonElement;
  
  const summaryName = document.getElementById('summary-name') as HTMLSpanElement;
  const summaryFlavor = document.getElementById('summary-flavor') as HTMLSpanElement;
  const summarySize = document.getElementById('summary-size') as HTMLSpanElement;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const customerName = formData.get('customerName') as string;
    const pizzaFlavor = formData.get('pizzaFlavor') as string;
    const pizzaSize = formData.get('pizzaSize') as string;

    // Format flavor
    let formattedFlavor = pizzaFlavor.charAt(0).toUpperCase() + pizzaFlavor.slice(1).replace('-', ' ');
    if (pizzaFlavor === 'four-cheese') formattedFlavor = 'Four Cheese';
    if (pizzaFlavor === 'chicken-catupiry') formattedFlavor = 'Chicken with Catupiry';
    if (pizzaFlavor === 'calabresa') formattedFlavor = 'Brazilian Calabresa';

    // Update success message
    summaryName.textContent = customerName;
    summaryFlavor.textContent = `${formattedFlavor} Pizza`;
    summarySize.textContent = pizzaSize.charAt(0).toUpperCase() + pizzaSize.slice(1);

    // Hide form, show payment
    form.style.display = 'none';
    paymentForm.classList.remove('hidden');
  });

  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Hide payment, show success
    paymentForm.classList.add('hidden');
    successMessage.classList.remove('hidden');
  });

  newOrderBtn.addEventListener('click', () => {
    form.reset();
    paymentForm.reset();
    successMessage.classList.add('hidden');
    form.style.display = 'block';
  });
});
