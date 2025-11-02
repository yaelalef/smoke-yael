#!/bin/bash

echo "🚀 Setting up Smoke Test Runner..."
echo ""

# Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# Install Playwright browsers
echo "🌐 Installing Playwright browsers..."
npx playwright install chromium --with-deps

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the test runner, run:"
echo "  npm start"
echo ""
echo "Then open http://localhost:3000 in your browser"
