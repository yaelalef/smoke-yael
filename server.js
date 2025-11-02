const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Simple rate limiting middleware
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 20; // max requests per window

function rateLimit(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, []);
    }
    
    const requests = rateLimitMap.get(ip).filter(time => now - time < RATE_LIMIT_WINDOW);
    
    if (requests.length >= MAX_REQUESTS) {
        return res.status(429).json({ success: false, error: 'Too many requests, please try again later' });
    }
    
    requests.push(now);
    rateLimitMap.set(ip, requests);
    next();
}

app.use(express.json());

// Serve only the index.html file from root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Run a specific test
app.post('/run-test', rateLimit, (req, res) => {
    const { testName, config } = req.body;
    
    if (!testName) {
        return res.status(400).json({ success: false, error: 'Test name is required' });
    }

    // Whitelist of allowed test names for security
    const allowedTests = ['login', 'book-trip', 'booking-with-traveller', 'flight-search', 'my-bookings', 'logout'];
    if (!allowedTests.includes(testName)) {
        return res.status(400).json({ success: false, error: 'Invalid test name' });
    }

    const testFile = path.join(__dirname, 'tests', `${testName}.spec.js`);
    
    if (!fs.existsSync(testFile)) {
        return res.status(404).json({ success: false, error: `Test file not found: ${testName}` });
    }

    // Set environment variables
    const env = {
        ...process.env,
        BASE_URL: config.baseUrl || 'https://ui-dev.gtp-staging.com/',
        USERNAME: config.username || 'jskrl@jskrl.com',
        PASSWORD: config.password || 'Test@123',
        HEADLESS: config.headless ? 'true' : 'false',
        TIMEOUT: (config.timeout * 1000).toString()
    };

    // Build the command
    const command = `npx playwright test "${testFile}" --reporter=list`;

    console.log(`Running test: ${testName}`);
    console.log(`Command: ${command}`);

    exec(command, { 
        env,
        cwd: __dirname,
        maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    }, (error, stdout, stderr) => {
        const output = stdout + stderr;
        
        if (error) {
            console.error(`Test ${testName} failed:`, error);
            return res.json({
                success: false,
                error: error.message,
                output: output
            });
        }

        console.log(`Test ${testName} completed successfully`);
        res.json({
            success: true,
            output: output
        });
    });
});

// Health check endpoint
app.get('/health', rateLimit, (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`\n🚀 Smoke Test Runner Server Started`);
    console.log(`📍 Server running at: http://localhost:${PORT}`);
    console.log(`🧪 Test directory: ${path.join(__dirname, 'tests')}`);
    console.log(`\n✨ Open http://localhost:${PORT} in your browser to run tests\n`);
});
