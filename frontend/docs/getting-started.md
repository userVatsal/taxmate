# Getting Started with TaxMate

This guide will help you get started with TaxMate, from installation to your first transaction.

## Prerequisites

Before you begin, make sure you have:

- Node.js 18 or later
- npm or yarn
- A Supabase account
- A PostHog account
- A Sentry account
- A Vercel account

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taxmate.git
   cd taxmate
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Set up environment variables:
   ```bash
   npm run setup-env
   ```

   You'll need to provide:
   - Supabase URL
   - Supabase Anon Key
   - PostHog Key
   - PostHog Host
   - Sentry DSN

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Your First Transaction

1. Sign up for an account at [http://localhost:3000/auth/register](http://localhost:3000/auth/register)

2. Log in to your account at [http://localhost:3000/auth/login](http://localhost:3000/auth/login)

3. Navigate to the Transactions page

4. Click "Add Transaction" and fill in the details:
   - Date
   - Amount
   - Description
   - Category
   - Type (Income/Expense)

5. Click "Save" to create your first transaction

## Next Steps

- [Learn about features](./features.md)
- [Read the API documentation](./api/README.md)
- [Deploy to production](./deployment.md)
- [Contribute to the project](./contributing.md)

## Troubleshooting

If you encounter any issues:

1. Check the [FAQ](./faq.md)
2. Search the [documentation](./)
3. Open an [issue](https://github.com/yourusername/taxmate/issues)
4. Contact support at support@taxmate.uk 