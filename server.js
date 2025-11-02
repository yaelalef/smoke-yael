const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Run a specific test
app.post('/run-test', (req, res) => {
    const { testName, config } = req.body;
    
    if (!testName) {
        return res.status(400).json({ success: false, error: 'Test name is required' });
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
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`\n🚀 Smoke Test Runner Server Started`);
    console.log(`📍 Server running at: http://localhost:${PORT}`);
    console.log(`🧪 Test directory: ${path.join(__dirname, 'tests')}`);
    console.log(`\n✨ Open http://localhost:${PORT} in your browser to run tests\n`);
});
