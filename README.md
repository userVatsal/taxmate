# TaxMate - AI-Powered UK Tax Assistant

TaxMate is a modern SaaS platform designed to revolutionize tax management for UK freelancers, creators, and small businesses.

## Features

- Transaction management
- AI-powered categorization
- Tax calculations and reporting
- Real-time analytics
- Secure data storage

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase
- **AI**: OpenAI GPT-4
- **Analytics**: PostHog
- **Error Tracking**: Sentry
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- PostHog account
- Sentry account
- Vercel account

### Environment Setup

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

4. Verify environment setup:
   ```bash
   npm run verify-env
   ```

### Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

### Deployment

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. The GitHub Actions workflow will automatically deploy to Vercel

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 