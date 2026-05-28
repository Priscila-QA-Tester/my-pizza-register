# 📝 Test Cases Guide - QA Lab

Welcome to your QA Testing Lab! This guide contains the **Test Cases (TC)** that you will use to practice manual testing and automate using **Playwright**.

---

## 🍕 The Application: "Antigravity Pizza"
The website consists of two main parts:
1.  **Frontend (UI):** A beautiful glassmorphic visual interface where customers choose their name, pizza flavor, size, and enter their delivery details.
2.  **Backend (API):** A Node.js Express server that validates and stores the pizza orders inside a database (`SQLite`) at the `/api/orders` endpoint.

---

## 📋 Test Scenarios

### TC001 - Place Order Successfully (Full Delivery Flow)
*   **Objective:** Verify that a user can successfully select a pizza and fill in all mandatory delivery details (Street, Number, Neighborhood, and Phone Number) to complete the order.
*   **Manual Steps:**
    1.  Navigate to `http://localhost:5173`.
    2.  Fill in the **Full Name** field with "Priscila da Silva".
    3.  Under the **Pizza Flavor** dropdown, select "Brazilian Calabresa".
    4.  Select "Large" for the **Size**.
    5.  Click **Checkout**.
    6.  Fill in the delivery details:
        *   **Street Address:** "Star Avenue"
        *   **Number:** "123"
        *   **Neighborhood:** "Orbit City"
        *   **Phone Number:** "(11) 99999-9999"
    7.  Click **Confirm Order**.
*   **Expected Result:**
    *   The delivery form disappears.
    *   The "Order Confirmed!" success message is displayed.
    *   The order summary displays: Name: "Priscila da Silva", Flavor: "Brazilian Calabresa Pizza", Size: "Large".

---

### TC002 - Prevent Order Submission with Incomplete Delivery Details
*   **Objective:** Ensure the system blocks order submission if the user leaves any mandatory delivery field (Street, Number, Neighborhood, or Phone Number) empty (Frontend HTML5 Validation).
*   **Manual Steps:**
    1.  Navigate to `http://localhost:5173`.
    2.  Fill in the name with "John Tester".
    3.  Select the "Margherita" flavor and "Medium" size.
    4.  Click **Checkout**.
    5.  Leave any delivery field (such as **Number** or **Street**) empty.
    6.  Click **Confirm Order** directly.
*   **Expected Result:**
    *   The browser triggers a mandatory field validation alert and prevents form submission.
    *   The "Order Confirmed!" success screen is NOT displayed.

---

### TC003 [REAL BUG] - API Validation Failure (Pizza Flavor)
*   **Objective:** Verify that the Backend (API) correctly rejects invalid requests sent directly to `/api/orders`.
*   **Context:** There is an **intentional bug** left by the developer in the backend! They forgot to validate whether the `flavor` field was sent.
*   **Steps (API/Postman):**
    1.  Make a `POST` request to `http://localhost:3000/api/orders`.
    2.  Send the following JSON in the body of the request (notice that we do not send the `flavor` attribute):
        ```json
        {
          "customerName": "Maria Silva",
          "size": "large"
        }
        ```
*   **Expected Result:** The API should reject the request with a `400 Bad Request` status, stating that the `flavor` field is required.
*   **Actual Result (The Bug!):** The API accepts the order, responds with `201 Created`, and saves the flavorless pizza in the SQLite database!
*   **QA Action:** Report this bug in Jira.

## 🎓 Tips for Training:
1.  **Explore Manually first:** Before automating, open the site and click on everything. Try to break the site!
2.  **Study Selectors:** Open Inspect Element (F12) in Chrome and inspect the IDs (`#customerName`, `#submitPaymentBtn`). They are the "anchors" of your automation robots.
3.  **Observe Playwright's Speed:** Notice how fast Playwright runs the E2E tests in a fraction of a second.
