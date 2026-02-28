# Playwright TypeScript E2E Suite

This repository contains an end-to-end UI test suite for [Sauce Demo](https://www.saucedemo.com) built with Playwright and TypeScript.

The project is structured around:
- page objects for reusable UI actions and assertions
- typed test data objects for users and products
- Playwright projects for Chromium and Firefox
- Allure reporting in both local runs and GitHub Actions

## What This Project Covers

The current suite validates core storefront flows on Sauce Demo, including:
- authentication with valid and invalid credentials
- logout behavior
- inventory page validation
- product details validation
- add-to-cart flow
- product sorting by price
- navigation between inventory and product details pages

Test files live in [`src/tests`](/Users/ibrahimmustapha/Projects/Playwright-Typescript/src/tests).

## Stack

- TypeScript
- Playwright Test
- Allure Playwright reporter
- GitHub Actions for CI

## Project Structure

```text
.
├── .github/workflows/ci.yml
├── playwright.config.ts
├── src
│   ├── entity
│   │   ├── data
│   │   │   ├── errorrMessages.ts
│   │   │   ├── products.ts
│   │   │   └── users.ts
│   │   ├── productDetails.ts
│   │   └── userDetails.ts
│   ├── pages
│   │   ├── base.page.ts
│   │   ├── home.page.ts
│   │   ├── login.page.ts
│   │   ├── productDetails.page.ts
│   │   └── products.page.ts
│   ├── tests
│   │   ├── auth.spec.ts
│   │   ├── home.spec.ts
│   │   └── inventory.spec.ts
│   └── utils
│       └── logger.ts
├── package.json
└── tsconfig.json
```

## Test Design

### Page Objects

UI behavior is wrapped in page classes under [`src/pages`](/Users/ibrahimmustapha/Projects/Playwright-Typescript/src/pages). This keeps selectors and browser actions out of the specs and makes the tests easier to extend.

### Data Objects

Reusable user and product fixtures live under [`src/entity/data`](/Users/ibrahimmustapha/Projects/Playwright-Typescript/src/entity/data). These are typed objects used across tests for cleaner setup and stronger consistency.

### Logging

Tests use a small structured logger in [`src/utils/logger.ts`](/Users/ibrahimmustapha/Projects/Playwright-Typescript/src/utils/logger.ts) so execution output is easier to read in local runs and CI logs.

## Prerequisites

- Node.js 20 or later recommended
- npm

## Installation

```bash
npm install
npx playwright install --with-deps
```

## Running Tests

Run the full suite:

```bash
npm test
```

Run a single spec:

```bash
npx playwright test src/tests/auth.spec.ts
```

Run a specific browser project:

```bash
npx playwright test --project=Chromium
```

## Configuration

Playwright is configured in [`playwright.config.ts`](/Users/ibrahimmustapha/Projects/Playwright-Typescript/playwright.config.ts).

Current defaults include:
- `baseURL`: `https://www.saucedemo.com`
- browsers: Chromium and Firefox
- headless execution
- retry on failure
- trace collection on first retry
- screenshots only on failure
- video retention on failure
- Allure as the configured reporter

## Reporting

The suite uses Allure via `allure-playwright`, which writes raw test output to `allure-results`.

In CI:
- tests run in GitHub Actions
- Allure HTML is generated from `allure-results`
- both `allure-report` and `allure-results` are uploaded as workflow artifacts

The CI workflow lives in [`ci.yml`](/Users/ibrahimmustapha/Projects/Playwright-Typescript/.github/workflows/ci.yml).

## CI

GitHub Actions runs on:
- pushes to `master`
- pull requests

The pipeline:
- installs Node.js
- installs Java for the Allure CLI
- installs project dependencies
- installs Playwright browsers
- runs the test suite
- generates the Allure report
- uploads report artifacts

## Notes

- Generated folders such as `playwright-report`, `test-results`, `allure-results`, and `allure-report` are ignored in git.
- The suite currently targets Sauce Demo specifically, not a generic application under test.
