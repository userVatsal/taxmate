#!/bin/bash

# Exit on error
set -e

# Load environment variables
if [ -f .env ]; then
  source .env
fi

# Check for required environment variables
required_vars=(
  "NEXT_PUBLIC_SUPABASE_URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  "NEXT_PUBLIC_SENTRY_DSN"
  "NEXT_PUBLIC_POSTHOG_KEY"
  "NEXT_PUBLIC_POSTHOG_HOST"
)

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "Error: $var is not set"
    exit 1
  fi
done

# Install dependencies
echo "Installing dependencies..."
npm install

# Run tests
echo "Running tests..."
npm test

# Build the application
echo "Building the application..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

# Verify deployment
echo "Verifying deployment..."
curl -s -o /dev/null -w "%{http_code}" https://taxmate.uk

echo "Deployment completed successfully!" 