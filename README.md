# Playwright TypeScript Project

## Overview
This project is a Playwright setup using TypeScript for end-to-end testing of web applications. It provides a structured way to write and execute tests with Playwright.

## Prerequisites
- Node.js (version 14 or later)
- npm (Node package manager)

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd Playwright-Typescript
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Project Structure
```
Playwright-Typescript
├── src
│   ├── tests
│   │   └── example.spec.ts
│   └── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Running Tests
To run the tests, use the following command:
```
npx playwright test
```

## Writing Tests
Tests are located in the `src/tests` directory. You can create new test files following the structure of `example.spec.ts`.

## Configuration
The Playwright configuration can be found in `src/playwright.config.ts`. You can customize the settings according to your testing needs.

## License
This project is licensed under the ISC License.