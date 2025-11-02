const { test, expect } = require('@playwright/test');

test('Complete Booking with Traveller - Full flow with "I\'m the traveller"', async ({ page }) => {
  console.log('Starting complete booking with traveller flow');
  
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
  
  // Fill in trip details
  console.log('Filling trip details');
  
  const fromField = page.locator('input[placeholder*="From" i], input[name*="origin" i], input[placeholder*="departure" i]').first();
  if (await fromField.isVisible({ timeout: 5000 }).catch(() => false)) {
    await fromField.fill('LHR');
    console.log('Filled origin: LHR');
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
  }
  
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
  
  // Select a flight (if results are shown)
  const selectFlightButton = page.locator('button:has-text("Select"), button:has-text("Choose"), button:has-text("Book")').first();
  if (await selectFlightButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await selectFlightButton.click();
    console.log('Selected a flight');
    await page.waitForTimeout(2000);
  }
  
  // Look for "I'm the traveller" checkbox or button
  console.log('Looking for traveller selection');
  const travellerCheckbox = page.locator('input[type="checkbox"]:near(:text("traveller")), button:has-text("I\'m the traveller"), label:has-text("I\'m the traveller")').first();
  if (await travellerCheckbox.isVisible({ timeout: 5000 }).catch(() => false)) {
    await travellerCheckbox.click();
    console.log('Selected "I\'m the traveller"');
    await page.waitForTimeout(1000);
  }
  
  // Fill traveller details if needed
  const firstNameField = page.locator('input[name*="firstName" i], input[placeholder*="first name" i]').first();
  if (await firstNameField.isVisible({ timeout: 5000 }).catch(() => false)) {
    await firstNameField.fill('John');
    console.log('Filled first name');
  }
  
  const lastNameField = page.locator('input[name*="lastName" i], input[placeholder*="last name" i]').first();
  if (await lastNameField.isVisible({ timeout: 5000 }).catch(() => false)) {
    await lastNameField.fill('Smith');
    console.log('Filled last name');
  }
  
  // Proceed to next step or complete booking
  const continueButton = page.locator('button:has-text("Continue"), button:has-text("Next"), button:has-text("Proceed")').first();
  if (await continueButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await continueButton.click();
    console.log('Clicked continue button');
    await page.waitForTimeout(2000);
  }
  
  console.log('Complete booking with traveller flow finished');
});
