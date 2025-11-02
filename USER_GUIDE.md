# Smoke Test Runner - User Guide

## Quick Start

### 1. Installation

Run the setup script to install all dependencies and browsers:

```bash
./setup.sh
```

Or manually:

```bash
npm install
npx playwright install chromium --with-deps
```

### 2. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### 3. Open in Browser

Navigate to `http://localhost:3000` in your web browser.

## Using the Test Runner

### Configuration Panel

#### Base URL
- Pre-configured with `https://ui-dev.gtp-staging.com/`
- Can be modified for different environments
- Changes are applied immediately when you run the next test

#### Credentials
- **Username/Email**: Pre-filled with `jskrl@jskrl.com`
- **Password**: Pre-filled with `Test@123`
- Update these fields if you need to test with different credentials

#### Browser Settings
- **Headless Mode**: Run tests without opening browser windows (faster)
- **Slow Motion**: Adds delays between actions for debugging (helps visualize test execution)

#### Test Timeout
- Default: 60 seconds
- Range: 30-300 seconds
- Increase for slow networks or complex workflows

### Running Tests

#### Individual Tests

Click any test button to run a specific test:

1. **Login with Specific Credentials**
   - Tests login functionality with jskrl@jskrl.com
   - Verifies successful authentication
   - Duration: ~10-15 seconds

2. **Login & Book New Trip**
   - Complete flow from login to trip booking initiation
   - Fills flight search form (LHR → JFK)
   - Duration: ~20-30 seconds

3. **Complete Booking with Traveller**
   - Full booking workflow
   - Includes "I'm the traveller" selection
   - Fills passenger details
   - Duration: ~30-40 seconds

4. **Flight Search Test (LHR → JFK)**
   - Focused test on search functionality
   - Tests London Heathrow to JFK route
   - Verifies search results display
   - Duration: ~15-20 seconds

5. **My Bookings Navigation**
   - Tests navigation to bookings page
   - Verifies bookings list or empty state
   - Duration: ~10-15 seconds

6. **User Logout Test**
   - Tests logout functionality
   - Verifies successful logout and redirect
   - Duration: ~10-15 seconds

#### Run All Tests

Click the **"▶ Run All Tests"** button to execute the entire test suite sequentially.

- Total duration: ~2-3 minutes
- Tests run with 2-second intervals between them
- Full execution log is displayed in real-time

### Test Results & Logs

#### Real-time Logging

The Results panel shows:
- **Timestamps**: When each action occurred
- **Status Indicators**: 
  - 🚀 Test starting
  - ✅ Success (green)
  - ❌ Failure (red)
  - ⚠️ Warning (yellow)
- **Detailed Output**: Step-by-step execution logs
- **Error Messages**: Detailed error information if tests fail

#### Color Coding

- **Blue**: Information logs
- **Green**: Success messages
- **Red**: Error messages
- **Yellow**: Warning messages

#### Export Results

Click the **"Export"** button to:
- Save test results to a text file
- Filename format: `test-results-YYYY-MM-DD.txt`
- Includes all logs with timestamps

#### Clear Results

Click the **"Clear"** button to:
- Reset the results panel
- Start fresh for new test runs
- Does not affect test history or exported files

## Command Line Usage

### Run All Tests (CLI)

```bash
npm test
```

### Run Tests in Headed Mode (see browser)

```bash
npm run test:headed
```

### Run Specific Test

```bash
npx playwright test tests/login.spec.js
```

### Run with Custom Configuration

```bash
BASE_URL=https://example.com USERNAME=test@example.com PASSWORD=secret123 npm test
```

## Test Scenarios Explained

### Login Test
- Navigates to the application
- Locates email and password fields
- Enters credentials
- Clicks login button
- Verifies successful login by checking for user menu or URL change

### Book Trip Test
- Performs login
- Navigates to booking page
- Fills origin (LHR) and destination (JFK)
- Clicks search
- Verifies search initiated

### Booking with Traveller Test
- Performs login
- Initiates booking flow
- Searches for flights (LHR → JFK)
- Selects a flight (if available)
- Checks "I'm the traveller" option
- Fills passenger details
- Proceeds to next step

### Flight Search Test
- Checks if login is required
- Navigates to search form
- Enters LHR (London Heathrow) as origin
- Enters JFK (John F Kennedy) as destination
- Submits search
- Waits for results

### My Bookings Test
- Performs login
- Looks for "My Bookings" navigation link
- Clicks link or navigates directly
- Verifies bookings page loaded

### Logout Test
- Performs login
- Opens user menu (if applicable)
- Clicks logout button
- Verifies logout successful (login form visible or redirected)

## Troubleshooting

### Browser Not Installed

If you see errors about browsers not being installed:

```bash
npx playwright install chromium
```

### Port Already in Use

If port 3000 is already in use:

```bash
PORT=3001 npm start
```

### Tests Timing Out

- Increase the timeout value in the Configuration Panel
- Check your internet connection
- Verify the Base URL is accessible

### Login Failures

- Verify credentials are correct
- Check if the application is available
- Try running in headed mode to see what's happening

## Environment Variables

You can set these environment variables:

- `BASE_URL`: Application base URL
- `USERNAME`: Login username/email
- `PASSWORD`: Login password
- `HEADLESS`: true/false (run in headless mode)
- `TIMEOUT`: Test timeout in milliseconds
- `PORT`: Server port (default: 3000)

Example:

```bash
BASE_URL=https://example.com PORT=3001 npm start
```

## Best Practices

1. **Start Small**: Run individual tests first before running the full suite
2. **Use Headless Mode**: For faster execution in production
3. **Use Headed Mode**: For debugging and seeing what's happening
4. **Export Logs**: Keep records of test runs for comparison
5. **Update Timeout**: Adjust based on your network speed and application performance
6. **Check Configuration**: Verify Base URL and credentials before running tests

## Support

For issues or questions:
1. Check the console logs in the browser developer tools
2. Check the server logs in the terminal
3. Review the test files in the `tests/` directory
4. Export and review the detailed logs

## Advanced Usage

### Modifying Tests

Test files are located in `tests/` directory. Each test is a Playwright test that can be customized:

```javascript
const { test, expect } = require('@playwright/test');

test('Your Custom Test', async ({ page }) => {
  console.log('Starting custom test');
  await page.goto('/');
  // Your test code here
});
```

### Adding New Tests

1. Create a new `.spec.js` file in the `tests/` directory
2. Follow the existing test pattern
3. Add a button in `index.html` to trigger your test
4. Update the server to recognize the new test

### Customizing the UI

Edit `index.html` to:
- Change colors and styling
- Add new configuration options
- Modify the layout
- Add new features

## Performance Tips

- Use headless mode for CI/CD pipelines
- Run tests in parallel (modify Playwright config)
- Increase workers for faster execution
- Cache authentication state to skip login steps
- Use test fixtures for common setup
