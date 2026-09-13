#!/bin/bash
# ================================================================
# Custom Gift Hub - Backend & Admin Panel Deployment Script
# Hostinger Business Web Hosting / Git Auto-Deploy Hook
# ================================================================

set -e

echo '>>> Starting Next.js Storefront Deployment...'

# Navigate to script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Ensure dependencies are installed cleanly
echo '>>> Installing storefront dependencies...'
npm install

# Compile Next.js to .next/standalone
echo '>>> Building Next.js Storefront...'
npm run build

# Restart Node.js application (Phusion Passenger / LiteSpeed mechanism on Hostinger)
mkdir -p tmp
touch tmp/restart.txt

echo '>>> Next.js Storefront Deployment Complete!'

