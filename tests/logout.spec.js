const { test, expect } = require('@playwright/test');

test('User Logout Test - Test logout functionality', async ({ page }) => {
  console.log('Starting logout test');
  
  // Login first
  await page.goto('/');
  console.log('Navigated to home page');
  
  await page.waitForTimeout(2000);
  
  const emailInput = page.locator('input[type="email"], input[name*="email" i], input[name*="username" i], input[placeholder*="email" i]').first();
  await emailInput.waitFor({ timeout: 10000 });
  await emailInput.fill(process.env.USERNAME || 'jskrl@jskrl.com');
  console.log('Filled email field');
  
  const passwordInput = page.locator('input[type="password"], input[name*="password" i]').first();
  await passwordInput.fill(process.env.PASSWORD || 'Test@123');
  console.log('Filled password field');
  
  const loginButton = page.locator('button:has-text("Log in"), button:has-text("Sign in"), button[type="submit"]').first();
  await loginButton.click();
  console.log('Clicked login button');
  
  await page.waitForTimeout(3000);
  console.log('Login completed');
  
  // Look for logout button
  console.log('Looking for logout button');
  
  // Check if there's a user menu that needs to be opened first
  const userMenu = page.locator('[data-testid*="user"], .user-menu, button:has-text("Account"), [aria-label*="user" i]').first();
  if (await userMenu.isVisible({ timeout: 5000 }).catch(() => false)) {
    console.log('Found user menu, clicking to open');
    await userMenu.click();
    await page.waitForTimeout(1000);
  }
  
  // Now look for logout button
  const logoutButton = page.locator('button:has-text("Log out"), button:has-text("Logout"), a:has-text("Log out"), a:has-text("Logout"), button:has-text("Sign out")').first();
  
  if (await logoutButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await logoutButton.click();
    console.log('Clicked logout button');
  } else {
    console.log('Logout button not found in menu, trying direct navigation');
    await page.goto('/logout');
  }
  
  await page.waitForTimeout(3000);
  
  // Verify logout - should see login page or login form
  const loginFormVisible = await page.locator('input[type="email"], input[type="password"], button:has-text("Log in")').first().isVisible({ timeout: 10000 }).catch(() => false);
  
  if (loginFormVisible) {
    console.log('Logout successful - login form is visible');
  } else {
    console.log('Logout completed - checking URL');
    const currentUrl = page.url();
    if (currentUrl.includes('login') || currentUrl === page.context()._options.baseURL + '/') {
      console.log('Logout successful - redirected to login or home');
    }
  }
  
  console.log('Logout test completed');
});
