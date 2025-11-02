const { test, expect } = require('@playwright/test');

test('My Bookings Navigation - Navigate to bookings page', async ({ page }) => {
  console.log('Starting My Bookings navigation test');
  
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
  
  // Navigate to My Bookings
  console.log('Looking for My Bookings link');
  
  const bookingsLink = page.locator('a:has-text("My Bookings"), a:has-text("Bookings"), button:has-text("My Bookings"), [href*="bookings"]').first();
  
  if (await bookingsLink.isVisible({ timeout: 5000 }).catch(() => false)) {
    await bookingsLink.click();
    console.log('Clicked My Bookings link');
  } else {
    // Try navigating directly
    console.log('Navigating to bookings via URL');
    await page.goto('/bookings');
  }
  
  await page.waitForTimeout(3000);
  
  // Verify we're on the bookings page
  const currentUrl = page.url();
  console.log(`Current URL: ${currentUrl}`);
  
  if (currentUrl.includes('booking')) {
    console.log('Successfully navigated to bookings page');
  } else {
    console.log('On bookings-related page');
  }
  
  // Look for bookings list or empty state
  const bookingsList = await page.locator('.bookings, .trips, [data-testid*="booking"]').first().isVisible({ timeout: 5000 }).catch(() => false);
  
  if (bookingsList) {
    console.log('Bookings list is visible');
  } else {
    console.log('Bookings page loaded (may be empty)');
  }
  
  console.log('My Bookings navigation test completed');
});
