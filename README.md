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

   **Note:** If you encounter issues downloading browsers, you can try:
   ```bash
   npx playwright install chromium
   ```
   
   Or install with system dependencies:
   ```bash
   npx playwright install --with-deps
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

**Note:** On systems without a display (like CI/headless servers), you may need to use xvfb:
```bash
xvfb-run npm test
```

Or configure headless mode in `playwright.config.js` or via command line:
```bash
npx playwright test --headless
```

## Test Configuration

The Playwright configuration is in `playwright.config.js`. It includes:
- Support for Chromium browser (Firefox and WebKit can be enabled after installation)
- HTML reporter for test results
- Trace collection on first retry
- Parallel test execution
- **Headed mode enabled by default** (browser window visible during tests)

To run in headless mode (no browser window), you can:
1. Set `headless: true` in `playwright.config.js`
2. Or use the command line flag: `npx playwright test --headless`

**Note:** Headless mode requires the chromium headless shell to be installed via `npx playwright install`.

## Writing Tests

Tests are located in the `tests/` directory. There are two example test files:

1. **local.spec.js** - Tests that work with local HTML files (no internet required)
2. **example.spec.js** - Example tests for external websites (requires internet access)

Example test structure:

```javascript
const { test, expect } = require('@playwright/test');

test('test description', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Expected Title/);
});
```

### Testing Local HTML Files

The `test-fixtures/` directory contains HTML files for local testing. Example:

```javascript
const path = require('path');

test('local test', async ({ page }) => {
  const filePath = path.join(__dirname, '..', 'test-fixtures', 'test-page.html');
  await page.goto(`file://${filePath}`);
  await expect(page).toHaveTitle('Test Page');
});
```

## Documentation

For more information, visit the [Playwright documentation](https://playwright.dev/).