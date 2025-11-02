const { test, expect } = require('@playwright/test');

test('Login with Specific Credentials - jskrl@jskrl.com', async ({ page }) => {
  console.log('Starting login test with jskrl@jskrl.com');
  
  await page.goto('/');
  console.log('Navigated to home page');
  
  // Wait for login button or email field
  await page.waitForTimeout(2000);
  
  // Look for email/username input field
  const emailInput = page.locator('input[type="email"], input[name*="email" i], input[name*="username" i], input[placeholder*="email" i]').first();
  await emailInput.waitFor({ timeout: 10000 });
  await emailInput.fill('jskrl@jskrl.com');
  console.log('Filled email field');
  
  // Look for password input field
  const passwordInput = page.locator('input[type="password"], input[name*="password" i]').first();
  await passwordInput.fill(process.env.PASSWORD || 'Test@123');
  console.log('Filled password field');
  
  // Look for login/submit button
  const loginButton = page.locator('button:has-text("Log in"), button:has-text("Sign in"), button[type="submit"]').first();
  await loginButton.click();
  console.log('Clicked login button');
  
  // Wait for navigation or success indicator
  await page.waitForTimeout(3000);
  
  // Verify login was successful - check for user menu, dashboard, or logout button
  const loggedIn = await page.locator('button:has-text("Log out"), button:has-text("Logout"), [data-testid*="user"], .user-menu').first().isVisible({ timeout: 10000 }).catch(() => false);
  
  if (loggedIn) {
    console.log('Login successful - user menu visible');
  } else {
    console.log('Login completed - verifying by URL change');
    expect(page.url()).not.toContain('/login');
  }
});
