const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Local Browser Tests', () => {
  test('should load a local HTML file', async ({ page }) => {
    // Navigate to local HTML file
    const filePath = path.join(__dirname, '..', 'test-fixtures', 'test-page.html');
    await page.goto(`file://${filePath}`);
    
    // Verify the page title
    await expect(page).toHaveTitle('Test Page');
  });

  test('should interact with page elements', async ({ page }) => {
    // Navigate to local HTML file
    const filePath = path.join(__dirname, '..', 'test-fixtures', 'test-page.html');
    await page.goto(`file://${filePath}`);
    
    // Check for the heading
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Welcome to the Test Page');
  });

  test('should handle button clicks', async ({ page }) => {
    // Navigate to local HTML file
    const filePath = path.join(__dirname, '..', 'test-fixtures', 'test-page.html');
    await page.goto(`file://${filePath}`);
    
    // Click the button
    await page.click('#testButton');
    
    // Verify the result
    const result = page.locator('#result');
    await expect(result).toHaveText('Button clicked!');
  });
});
