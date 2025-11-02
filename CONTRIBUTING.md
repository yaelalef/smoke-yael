# Contributing to Smoke Test Runner

Thank you for your interest in contributing to the Smoke Test Runner project!

## Development Setup

1. Fork and clone the repository
2. Run `./setup.sh` or manually install dependencies
3. Start the development server with `npm start`

## Project Structure

```
smoke-yael/
├── tests/                      # Playwright test specifications
│   ├── login.spec.js          # Login test
│   ├── book-trip.spec.js      # Book trip test
│   ├── booking-with-traveller.spec.js
│   ├── flight-search.spec.js  # Flight search test
│   ├── my-bookings.spec.js    # My bookings navigation
│   └── logout.spec.js         # Logout test
├── index.html                  # Main UI interface
├── server.js                   # Express server
├── playwright.config.js        # Playwright configuration
├── package.json               # Project dependencies
├── setup.sh                   # Installation script
├── README.md                  # Project overview
└── USER_GUIDE.md             # Detailed user guide
```

## Adding New Tests

To add a new test:

1. Create a new test file in `tests/` directory:

```javascript
const { test, expect } = require('@playwright/test');

test('Your Test Name', async ({ page }) => {
  console.log('Starting your test');
  
  // Your test logic here
  await page.goto('/');
  
  console.log('Test completed');
});
```

2. Add a button in `index.html`:

```html
<button class="test-btn" onclick="runTest('your-test-name')">
    <span>Your Test Name</span>
</button>
```

3. The test file should be named `your-test-name.spec.js`

## Code Style

- Use consistent indentation (2 spaces)
- Add descriptive console.log statements for test steps
- Use async/await for asynchronous operations
- Add comments for complex logic
- Follow existing naming conventions

## Testing Your Changes

1. Test locally with `npm start`
2. Run individual tests to verify functionality
3. Run the full test suite with "Run All Tests"
4. Test in both headless and headed modes
5. Verify UI responsiveness on different screen sizes

## Submitting Changes

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request with:
   - Clear description of changes
   - Screenshots if UI changes
   - Test results

## Reporting Issues

When reporting issues, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Browser and OS information
- Error messages from console

## Feature Requests

We welcome feature requests! Please provide:
- Clear description of the feature
- Use case and benefits
- Example implementation (if applicable)

## Questions?

Feel free to open an issue for any questions or clarifications.
