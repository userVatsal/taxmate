import { createInterface } from 'readline';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function main() {
  console.log('Setting up environment variables...\n');

  const supabaseUrl = await question('Enter your Supabase URL: ');
  const supabaseAnonKey = await question('Enter your Supabase Anon Key: ');
  const posthogKey = await question('Enter your PostHog Key: ');
  const posthogHost = await question('Enter your PostHog Host: ');
  const sentryDsn = await question('Enter your Sentry DSN: ');

  const envContent = `NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey}
NEXT_PUBLIC_POSTHOG_KEY=${posthogKey}
NEXT_PUBLIC_POSTHOG_HOST=${posthogHost}
NEXT_PUBLIC_SENTRY_DSN=${sentryDsn}
`;

  const envPath = resolve(process.cwd(), '.env.local');
  writeFileSync(envPath, envContent);

  console.log('\n✅ Environment variables have been set up successfully!');
  rl.close();
}

main().catch((error) => {
  console.error('Error setting up environment variables:', error);
  process.exit(1);
}); 