# Playwright Automation Framework (JavaScript)

## 📌 Overview
This project is an **end-to-end UI automation framework** built using [Microsoft Playwright](https://playwright.dev/).  
It follows the **Page Object Model (POM)** design pattern for better maintainability and scalability.

## 🚀 Features
- **Page Object Model (POM)** structure for clean separation of concerns.
- **Cross-browser testing** (Chromium, Firefox, WebKit).
- **Headed & headless execution** support.
- **Test data management** using JSON files.
- **Configurable environments** (QA, Staging, Production).
- Detailed **HTML/Allure reports** with execution results.

## 🗂 Project Structure
Playwright_Page_Object_Model/
│
├── tests/ # Test files
│ ├── demo/ # Demo test cases
│ └── regression/ # Regression suite
│
├── pages/ # Page Object files
│ ├── HomePage.js
│ ├── ContactPage.js
│ └── ...
│
├── test-data/qa/ # Test data in JSON format
│ └── youtubeSearch.json
│
├── playwright.config.js # Playwright configuration
├── package.json # Project dependencies & scripts
└── README.md # Project documentation

## 🛠 Installation
```bash
# Clone the repository
git clone https://github.com/pravinkumbhare/Playwright_Page_Object_Model.git

# Navigate into the project folder
cd Playwright_Page_Object_Model

# Install dependencies
npm install
▶ Running Tests
Run All Tests (Headless)

npx playwright test
Run in Headed Mode

npx playwright test --headed
Run a Specific Test File

npx playwright test tests/demo/example.spec.js
📄 Reports
After running the tests, view the HTML report:

npx playwright show-report
🧪 Example Test
javascript

import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';

test('Contact form submission', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.fillContactInformation('test@example.com', 'John Doe', 'Hello!');
    await expect(page.locator('.success-message')).toHaveText('Thanks for the message!!');
});

📚 Resources
Playwright Docs
Page Object Model Guide
Author: Pravin Kumbhare

