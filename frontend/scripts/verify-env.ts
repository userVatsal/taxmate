const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SENTRY_DSN',
  'NEXT_PUBLIC_POSTHOG_KEY',
  'NEXT_PUBLIC_POSTHOG_HOST',
];

console.log('Checking environment variables...\n');

let allPresent = true;

requiredEnvVars.forEach((envVar) => {
  const value = process.env[envVar];
  if (!value) {
    console.error(`❌ ${envVar} is not set`);
    allPresent = false;
  } else {
    console.log(`✅ ${envVar} is set`);
  }
});

if (allPresent) {
  console.log('\nAll environment variables are properly configured! 🎉');
} else {
  console.error('\nSome environment variables are missing. Please set them up before continuing.');
  process.exit(1);
} 