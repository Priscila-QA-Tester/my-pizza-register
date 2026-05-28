# 🍕 Antigravity Pizza Order Register

A modern, highly polished **Quality Assurance (QA)** learning repository showcasing end-to-end (E2E) automation, backend REST API load testing, and continuous integration (CI/CD). 

This project simulates a real-world pizza delivery portal, split into a Vite frontend client and a Node.js Express server.

---

## 🛠️ Project Architecture: Client-Server Split

Unlike basic monolith apps, this project features a realistic corporate architecture split into two independent services:
1.  **Frontend App (`/app`):** Built with Vite and TypeScript, running on `http://localhost:5173`.
2.  **Backend API (`/backend-api`):** Built with Express and SQLite (`pizza.db`), running on `http://localhost:3000`.

*For more details on how to test separate ports, see [ARCHITECTURE_EXPLAINED.md](ARCHITECTURE_EXPLAINED.md).*

---

## 📋 Features & Delivery Validation Rules

We completely refactored the legacy checkout system (removing the unrealistic credit card input fields) to implement a highly robust and authentic **Delivery Details Flow**.

### 🔒 Form Submission & Mandatory Field Rules
To guarantee successful delivery and prevent operational errors, the system enforces a strict validation rule: **orders can only be completed if all delivery inputs are filled**.
*   **Segmented Address Inputs:** Instead of a single address box, the address is split into separate inputs for **Street Address**, **House/Apt Number**, and **Neighborhood** to prevent users from accidentally omitting the house number.
*   **Frontend HTML5 Validation:** Every single input (Name, Flavor, Size, Street, Number, Neighborhood, and Phone) is marked as `required`. The browser blocks submission and displays a native error alert if any field is empty.
*   **Automatic Navigation:** The app dynamically guides the user from the Pizza selection screen to the Delivery Details form, culminating in the "Order Confirmed!" page.

---

## 🧪 E2E Test Suite (Playwright + POM)

The E2E test suite located in `/e2e-tests` uses the **Page Object Model (POM)** architecture inside [PizzaOrderPage.ts](e2e-tests/pages/PizzaOrderPage.ts) for maximum code maintainability.

### Covered Scenarios:
1.  **`should fill the form and submit successfully` (Happy Path):** Validates that a user can select a pizza, fill in all segmented delivery inputs, and see the correct order summary.
2.  **`should prevent order if delivery details are empty` (Negative Path):** Ensures that form submission is blocked and the confirmation message remains hidden if delivery inputs are empty.

*To run tests locally:*
```bash
cd e2e-tests
npx playwright test
```

---

## 📈 Performance & Load Testing (K6)

We use **K6** to perform API load testing, verifying how the backend REST API `/api/orders` handles peak traffic under stress.

*To run the performance script:*
```bash
k6 run performance-tests/pizza-load-test.js
```

---

## 🤖 CI/CD Automation (GitHub Actions)

This repository includes a continuous integration pipeline inside [.github/workflows/pizza-tests.yml](.github/workflows/pizza-tests.yml).

### Cloud Workflow Steps:
1.  Downloads the code inside an Ubuntu Linux virtual environment.
2.  Installs all Node.js dependencies for the API, App, and Tests.
3.  Starts the Backend API on port 3000 in the background.
4.  Starts the Frontend App on port 5173 in the background.
5.  Downloads the Playwright Chromium browser.
6.  Waits for both servers to be fully online using `wait-on`.
7.  Runs the Playwright E2E tests dynamically in **headless mode** to ensure code health before deployment.

---

*For command lists and shortcuts, check [QUICK_GUIDE.md](QUICK_GUIDE.md). Happy testing! 🚀*
