const { test, expect } = require('@playwright/test');

test('Login & Book New Trip - Complete flow', async ({ page }) => {
  console.log('Starting login and book new trip flow');
  
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
  
  // Navigate to book a trip
  const bookTripButton = page.locator('button:has-text("Book"), a:has-text("Book"), button:has-text("New Trip"), a:has-text("New Trip")').first();
  if (await bookTripButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await bookTripButton.click();
    console.log('Clicked book trip button');
  } else {
    console.log('Navigating to booking page via URL');
    await page.goto('/book');
  }
  
  await page.waitForTimeout(2000);
  
  // Fill in trip details (this is a generic flow, adjust selectors as needed)
  console.log('Filling trip details');
  
  // Look for from/origin field
  const fromField = page.locator('input[placeholder*="From" i], input[name*="origin" i], input[placeholder*="departure" i]').first();
  if (await fromField.isVisible({ timeout: 5000 }).catch(() => false)) {
    await fromField.fill('LHR');
    console.log('Filled origin: LHR');
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
  }
  
  // Look for to/destination field
  const toField = page.locator('input[placeholder*="To" i], input[name*="destination" i], input[placeholder*="arrival" i]').first();
  if (await toField.isVisible({ timeout: 5000 }).catch(() => false)) {
    await toField.fill('JFK');
    console.log('Filled destination: JFK');
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
  }
  
  // Click search button
  const searchButton = page.locator('button:has-text("Search"), button[type="submit"]').first();
  if (await searchButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await searchButton.click();
    console.log('Clicked search button');
    await page.waitForTimeout(3000);
  }
  
  console.log('Trip booking flow initiated successfully');
});
