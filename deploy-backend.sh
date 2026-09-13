#!/bin/bash
# ================================================================
# Custom Gift Hub - Backend & Admin Panel Deployment Script
# Hostinger Business Web Hosting / Git Auto-Deploy Hook
# ================================================================

set -e

echo '>>> Starting Vendure Backend & Admin Panel Deployment...'

# Navigate to script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"


# Ensure node_modules are installed cleanly
echo '>>> Installing backend production dependencies...'
npm install --omit=dev

# Compile TypeScript to dist/
echo '>>> Compiling backend TypeScript...'
npm run build

# Restart Node.js application (Phusion Passenger / LiteSpeed mechanism on Hostinger)
mkdir -p tmp
touch tmp/restart.txt

echo '>>> Vendure Backend & Admin Panel Deployment Complete!'
