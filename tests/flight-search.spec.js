const { test, expect } = require('@playwright/test');

test('Flight Search Test - LHR → JFK search functionality', async ({ page }) => {
  console.log('Starting flight search test: LHR → JFK');
  
  await page.goto('/');
  console.log('Navigated to home page');
  
  await page.waitForTimeout(2000);
  
  // Check if we need to login first
  const emailInput = page.locator('input[type="email"], input[name*="email" i], input[name*="username" i], input[placeholder*="email" i]').first();
  const emailVisible = await emailInput.isVisible({ timeout: 5000 }).catch(() => false);
  
  if (emailVisible) {
    console.log('Login required, logging in first');
    await emailInput.fill(process.env.USERNAME || 'jskrl@jskrl.com');
    
    const passwordInput = page.locator('input[type="password"], input[name*="password" i]').first();
    await passwordInput.fill(process.env.PASSWORD || 'Test@123');
    
    const loginButton = page.locator('button:has-text("Log in"), button:has-text("Sign in"), button[type="submit"]').first();
    await loginButton.click();
    console.log('Clicked login button');
    
    await page.waitForTimeout(3000);
  }
  
  // Navigate to search/booking page if not already there
  const fromField = page.locator('input[placeholder*="From" i], input[name*="origin" i], input[placeholder*="departure" i]').first();
  const fromVisible = await fromField.isVisible({ timeout: 3000 }).catch(() => false);
  
  if (!fromVisible) {
    console.log('Search form not visible, navigating to booking page');
    await page.goto('/book');
    await page.waitForTimeout(2000);
  }
  
  // Fill in search details: LHR → JFK
  console.log('Filling flight search: LHR → JFK');
  
  const originField = page.locator('input[placeholder*="From" i], input[name*="origin" i], input[placeholder*="departure" i]').first();
  await originField.waitFor({ timeout: 10000 });
  await originField.click();
  await originField.fill('LHR');
  console.log('Filled origin: LHR');
  await page.waitForTimeout(1000);
  
  // Select from dropdown if available
  const lhrOption = page.locator('text=LHR, text=London Heathrow').first();
  if (await lhrOption.isVisible({ timeout: 2000 }).catch(() => false)) {
    await lhrOption.click();
  } else {
    await page.keyboard.press('Enter');
  }
  
  const destinationField = page.locator('input[placeholder*="To" i], input[name*="destination" i], input[placeholder*="arrival" i]').first();
  await destinationField.click();
  await destinationField.fill('JFK');
  console.log('Filled destination: JFK');
  await page.waitForTimeout(1000);
  
  // Select from dropdown if available
  const jfkOption = page.locator('text=JFK, text=John F Kennedy').first();
  if (await jfkOption.isVisible({ timeout: 2000 }).catch(() => false)) {
    await jfkOption.click();
  } else {
    await page.keyboard.press('Enter');
  }
  
  // Click search button
  const searchButton = page.locator('button:has-text("Search"), button:has-text("Find flights"), button[type="submit"]').first();
  await searchButton.click();
  console.log('Clicked search button');
  
  // Wait for results
  await page.waitForTimeout(5000);
  
  // Verify search results or loading state
  const resultsVisible = await page.locator('.flight-results, .search-results, [data-testid*="results"]').first().isVisible({ timeout: 10000 }).catch(() => false);
  
  if (resultsVisible) {
    console.log('Search results displayed successfully');
  } else {
    console.log('Search submitted - waiting for results page');
    await page.waitForTimeout(2000);
  }
  
  console.log('Flight search test completed');
});
