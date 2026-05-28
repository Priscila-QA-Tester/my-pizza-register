# 📒 Pocket Quick Guide - QA Commands

Priscila, this is your safe harbor! No need to memorize anything. Whenever you forget a command, open this file in VS Code and copy-paste.

---

## ⚡ 1. Starting Up (Turning Everything On)

### Step A: Start the Website (Frontend)
1.  Open a terminal.
2.  Type: `cd app`
3.  Type: `npm run dev`

### Step B: Start the Kitchen (Backend API)
1.  Open another terminal tab (click the `+` icon).
2.  Type: `cd backend-api`
3.  Type: `node server.js`

---

## 🎭 2. Running Playwright E2E Tests
1.  Open a terminal.
2.  Type: `cd e2e-tests`
3.  Type: `npx playwright test`

---

## 🌲 3. Running Cypress Tests
1.  Open a terminal.
2.  Type: `cd cypress-tests`
3.  Type: `npx cypress run`

---

## 🌐 4. Running Selenium Tests
1.  Open a terminal.
2.  Type: `cd selenium-tests`
3.  Type: `node pizza-order.spec.js`

---

## 📈 5. Running K6 Performance Tests
1.  Open a terminal.
2.  Type: `k6 run performance-tests/pizza-load-test.js`
*   *(Alternative if K6 is not in PATH):*
    `& "C:\Program Files\k6\k6.exe" run performance-tests/pizza-load-test.js`

---

### 💡 Golden Reminder:
*   **`npm install`:** You do **NOT** need to run this anymore! It was only needed the first time to install packages.
*   **`Ctrl + C`:** If any command freezes or is running and you want to stop it, click in the terminal and press `Ctrl + C` to release typing.
*   **`Tab Key`:** Type the first letters of a folder (e.g. `cd cy` and press `Tab` to let VS Code autocomplete for you!).

You are fully capable and on the right path. Take a deep breath, celebrate today's victories, and go slow! 🌟
