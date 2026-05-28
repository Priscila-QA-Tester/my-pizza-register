# 🏢 Simulation: A Day in the Life of a QA Engineer

Priscila, welcome to your first simulated day as a QA Analyst! We are going to walk through the real-world phases of how your job would look inside a tech company.

---

## 💻 PHASE 1: Arriving at the Company and Cloning the Project (GitHub)

On your first day, the developer sends you a GitHub link and says: *"Priscila, here is the code for our new Pizza ordering site. Can you download it and start testing?"*

### Your actual step-by-step workflow:
1.  **Clone the Project:** Open your terminal and run the command to download (clone) the code from GitHub to your computer:
    ```bash
    git clone https://github.com/company-link/my-pizza-register.git
    ```
2.  **Open in VS Code:** Open VS Code, click "Open Folder", and select the project folder you just cloned.
3.  **Install Dependencies:** Since the project comes "clean" from the internet without external libraries, you run the installer in the folders:
    ```bash
    npm install
    ```

---

## 🔎 PHASE 2: Manual Testing and Finding "Locators" (Inspect Element)

Your first duty is to explore the site manually to understand the user flows and find **Locators** (the tags that automation robots use to click and type on the screen).

### 1. How to find Locators:
*   Open the site in Chrome (`http://localhost:5173`).
*   Right-click on the "Checkout" button and select **Inspect**.
*   A side panel filled with HTML code will open. Your QA eyes look for attributes like `id` or `class`:
    ```html
    <button id="submitOrderBtn" class="btn-primary">Checkout</button>
    ```
*   *Success! You found the Locator:* `#submitOrderBtn` *(the CSS ID of the button).*

### 2. How to find a Bug Manually:
*   Start testing alternative paths (negative scenarios). What if I try to checkout without selecting a size? What if I enter letters inside the card number input?
*   If the site lets incorrect data pass or crashes, **you found a BUG!**

---

## 🩺 PHASE 3: Testing the API and Database

Now you want to validate the backstage (the Backend/API).
*   Use a **REST Client** or **Postman** to send a direct request to the server (`http://localhost:3000/api/orders`).
*   Simulate a malicious user and send an order without the pizza flavor.
*   The server responds with **`201 Created`** (Success) instead of rejecting it. **API Bug Detected!**

---

## 📝 PHASE 4: Documenting the Bug in Jira (Opening a Ticket)

You found an API bug (flavor not mandatory). Now you need to document it professionally in **Jira** (the company's task manager) so the developers can fix it.

### Your Professional Bug Report Template:

*   **Summary (Title):** [API] Validation failure when creating orders without a `flavor`
*   **Severity:** High 🔴 (corrupts SQLite database records)
*   **Description:** The order creation API at `/api/orders` accepts requests without the `flavor` parameter and saves incomplete null records in the database.
*   **Steps to Reproduce:**
    1.  Perform a `POST` request to `http://localhost:3000/api/orders`.
    2.  Send a JSON payload without the `flavor` attribute:
        ```json
        { "customerName": "Maria Silva", "size": "large" }
        ```
    3.  Send the request.
*   **Expected Result:** The API should reject the request with `400 Bad Request` stating that `flavor` is required.
*   **Actual Result:** The API accepts the order with `201 Created` and saves the incomplete record.
*   **Evidence:** *[Attach a screenshot of Postman showing the 201 Created status]*.

---

## 🤖 PHASE 5: Creating the Automated Test (E2E & Assertions)

To guarantee that this bug never returns after the developer fixes it, you create an automated E2E (End-to-End) test using Playwright.

In your automation script, you write **Assertions** (Checks):

*   **What is an Assertion?** It is the line of code where the robot verifies if the result is correct. It is the "assert that..." or "ensure that...".
    *   **In Playwright:**
        ```typescript
        await expect(page.locator('#success-message')).toBeVisible();
        ```

If the assertion matches, the test **Passes (Green)**. If the success screen doesn't show up or the name is different, the test **Fails (Red)** and the robot flags a bug!
