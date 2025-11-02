const { test, expect } = require('@playwright/test');

test.describe('Basic Browser Tests', () => {
  test('should load a webpage and verify title', async ({ page }) => {
    // Navigate to a webpage
    await page.goto('https://example.com');
    
    // Verify the page title
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('should interact with page elements', async ({ page }) => {
    // Navigate to a webpage
    await page.goto('https://example.com');
    
    // Check for a heading
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Example Domain');
  });

  test('should navigate and check links', async ({ page }) => {
    // Navigate to a webpage
    await page.goto('https://example.com');
    
    // Find and verify a link exists
    const link = page.locator('a');
    await expect(link).toBeVisible();
  });
});
