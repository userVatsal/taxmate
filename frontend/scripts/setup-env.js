const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  {
    name: 'NEXT_PUBLIC_SUPABASE_URL',
    message: 'Enter your Supabase URL (e.g., https://your-project-id.supabase.co): ',
    validate: (input) => input.startsWith('https://') && input.includes('supabase.co')
  },
  {
    name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    message: 'Enter your Supabase Anon Key: ',
    validate: (input) => input.length > 0
  },
  {
    name: 'NEXT_PUBLIC_SENTRY_DSN',
    message: 'Enter your Sentry DSN: ',
    validate: (input) => input.startsWith('https://')
  },
  {
    name: 'NEXT_PUBLIC_POSTHOG_KEY',
    message: 'Enter your PostHog API Key: ',
    validate: (input) => input.length > 0
  },
  {
    name: 'NEXT_PUBLIC_POSTHOG_HOST',
    message: 'Enter your PostHog Host (default: https://app.posthog.com): ',
    default: 'https://app.posthog.com',
    validate: (input) => input.startsWith('https://')
  }
];

const envVars = {};

function askQuestion(index) {
  if (index === questions.length) {
    // All questions answered, write to .env.local
    const envContent = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    fs.writeFileSync(path.join(__dirname, '../.env.local'), envContent);
    console.log('\n✅ Environment variables have been saved to .env.local');
    rl.close();
    return;
  }

  const question = questions[index];
  rl.question(question.message, (answer) => {
    const value = answer || question.default;
    
    if (question.validate && !question.validate(value)) {
      console.log('❌ Invalid input. Please try again.');
      askQuestion(index);
      return;
    }

    envVars[question.name] = value;
    askQuestion(index + 1);
  });
}

console.log('Welcome to the TaxMate environment setup!');
console.log('Please provide the following information:\n');

askQuestion(0); 