# Playwright QA Automation

A UI automation testing project built with Playwright and TypeScript.

## Project Overview

This project demonstrates automated end-to-end testing of the SauceDemo web application.

The test suite covers authentication, product functionality, sorting, and shopping cart workflows.

## Test Coverage

### Authentication
- Valid user login
- Locked-out user login
- Invalid credentials

### Products
- Product sorting by price
- Product interactions

### Shopping Cart
- Add product to cart
- Verify product appears in cart
- Cart validation

## Test Framework

- Playwright
- TypeScript
- Node.js

## Browsers Tested

- Chromium
- Firefox
- WebKit

## Test Results

Latest full test run:

- **30 tests passed**
- **0 failed**
- **0 flaky**
- **0 skipped**
- Execution time: approximately 45 seconds

## Project Structure

```text
playwright-qa/
├── .github/
│   └── workflows/
├── tests/
│   ├── cart.spec.ts
│   ├── example.spec.ts
│   ├── helpers.ts
│   ├── login.spec.ts
│   └── products.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.ts
