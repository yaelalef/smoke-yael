# smoke-yael

A web browser testing project using Playwright.

## Prerequisites

- Node.js (v14 or higher)
- npm

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in headed mode (see the browser):
```bash
npm run test:headed
```

Run tests with UI mode (interactive):
```bash
npm run test:ui
```

Run specific test file:
```bash
npx playwright test tests/example.spec.js
```

## Test Configuration

The Playwright configuration is in `playwright.config.js`. It includes:
- Support for Chromium, Firefox, and WebKit browsers
- HTML reporter for test results
- Trace collection on first retry
- Parallel test execution

## Writing Tests

Tests are located in the `tests/` directory. Example test structure:

```javascript
const { test, expect } = require('@playwright/test');

test('test description', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Expected Title/);
});
```

## Documentation

For more information, visit the [Playwright documentation](https://playwright.dev/).