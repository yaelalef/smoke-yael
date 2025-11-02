# Smoke Test Runner - Travel Booking Application

A professional test runner application with a modern UI for executing Playwright smoke tests for a travel booking application.

## 🌟 Features

### 🧪 Test Suite
- **Login with Specific Credentials** - Tests your jskrl@jskrl.com login
- **Login & Book New Trip** - Complete flow to book a trip
- **Complete Booking with Traveller** - Full flow including "I'm the traveller" selection
- **Flight Search Test** - LHR → JFK search functionality
- **My Bookings Navigation** - Navigate to bookings page
- **User Logout Test** - Test logout functionality
- **Run All Tests** - Execute entire test suite

### ⚙️ Configuration Panel
- **Base URL**: Pre-configured with https://ui-dev.gtp-staging.com/
- **Credentials**: Your username/password already set
- **Browser Settings**: Chromium, headless mode, timeouts
- **Live configuration updates**

### 📊 Results & Logging
- Real-time test logs with timestamps
- Step-by-step execution tracking
- Success/failure indicators
- Export results to file
- Clear results functionality

### 🎨 Professional Design
- Modern gradient UI with smooth animations
- Color-coded status indicators
- Responsive layout for different screen sizes
- Terminal-style results area

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yaelalef/smoke-yael.git
cd smoke-yael
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install chromium
```

### Running the Application

Start the test runner server:
```bash
npm start
```

Then open your browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
smoke-yael/
├── tests/                      # Test specifications
│   ├── login.spec.js
│   ├── book-trip.spec.js
│   ├── booking-with-traveller.spec.js
│   ├── flight-search.spec.js
│   ├── my-bookings.spec.js
│   └── logout.spec.js
├── index.html                  # UI interface
├── server.js                   # Express server
├── playwright.config.js        # Playwright configuration
└── package.json
```

## 🔧 Configuration

### Environment Variables

You can configure the following via environment variables or the UI:

- `BASE_URL`: Base URL for the application (default: https://ui-dev.gtp-staging.com/)
- `USERNAME`: Login username (default: jskrl@jskrl.com)
- `PASSWORD`: Login password (default: Test@123)
- `HEADLESS`: Run browser in headless mode (default: true)
- `TIMEOUT`: Test timeout in milliseconds (default: 60000)

### Running Tests via CLI

Run all tests:
```bash
npm test
```

Run tests in headed mode:
```bash
npm run test:headed
```

Run specific test:
```bash
npx playwright test tests/login.spec.js
```

## 📝 Test Details

### Login Test
Tests the login functionality with specific credentials (jskrl@jskrl.com).

### Book Trip Test
Complete flow from login to initiating a trip booking.

### Booking with Traveller Test
Full booking flow including the "I'm the traveller" selection option.

### Flight Search Test
Tests the flight search functionality specifically for LHR → JFK route.

### My Bookings Navigation
Verifies navigation to the bookings/trips page.

### Logout Test
Tests the logout functionality and verifies successful logout.

## 🎯 Usage

1. **Configure Settings**: Update Base URL, credentials, and browser settings in the Configuration Panel
2. **Select Test**: Click on any individual test button or "Run All Tests"
3. **Monitor Progress**: Watch real-time logs in the Results panel
4. **Export Results**: Click "Export" to save test results to a file
5. **Clear Logs**: Click "Clear" to reset the results panel

## 🛠️ Technologies Used

- **Playwright**: End-to-end testing framework
- **Express.js**: Web server for the UI
- **HTML/CSS/JavaScript**: Modern, responsive UI
- **Node.js**: Runtime environment

## 📄 License

ISC

## 👤 Author

Yael Alef
