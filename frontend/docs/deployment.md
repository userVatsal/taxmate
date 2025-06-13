# Deployment Guide

This guide will help you deploy TaxMate to your preferred hosting platform.

## Prerequisites

- Node.js 18 or later
- npm or yarn
- Git
- Vercel account (recommended)
- Supabase account
- PostHog account
- Sentry account

## Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host

# Sentry
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

2. Run the environment setup script:

```bash
npm run setup-env
```

## Vercel Deployment (Recommended)

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy to Vercel:

```bash
vercel
```

4. Follow the prompts to:
   - Set up and deploy
   - Link to existing project
   - Configure project settings
   - Set environment variables

5. For production deployment:

```bash
vercel --prod
```

## Manual Deployment

### Build the Application

1. Install dependencies:

```bash
npm install
```

2. Build the application:

```bash
npm run build
```

3. Start the production server:

```bash
npm start
```

### Docker Deployment

1. Build the Docker image:

```bash
docker build -t taxmate .
```

2. Run the container:

```bash
docker run -p 3000:3000 taxmate
```

## Database Setup

1. Create a new Supabase project
2. Run the database migrations:

```bash
npm run db:migrate
```

3. Seed the database (optional):

```bash
npm run db:seed
```

## Monitoring Setup

### Sentry

1. Create a new project in Sentry
2. Add the DSN to your environment variables
3. Configure error tracking in `sentry.client.config.ts` and `sentry.server.config.ts`

### PostHog

1. Create a new project in PostHog
2. Add the API key and host to your environment variables
3. Configure analytics in `posthog.ts`

## SSL/TLS Setup

### Vercel

SSL is automatically configured when deploying to Vercel.

### Manual Setup

1. Obtain SSL certificates from a trusted provider
2. Configure your web server (e.g., Nginx) with SSL:

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Backup Strategy

1. Set up automated database backups in Supabase
2. Configure backup retention policy
3. Test backup restoration process

## Scaling

### Horizontal Scaling

1. Deploy multiple instances behind a load balancer
2. Configure session management for multiple instances
3. Set up Redis for session storage

### Vertical Scaling

1. Increase server resources as needed
2. Monitor performance metrics
3. Optimize database queries and indexes

## Maintenance

### Regular Updates

1. Keep dependencies updated:

```bash
npm update
```

2. Run security audits:

```bash
npm audit
```

3. Apply security fixes:

```bash
npm audit fix
```

### Monitoring

1. Set up uptime monitoring
2. Configure error alerts
3. Monitor performance metrics

## Troubleshooting

### Common Issues

1. Build Failures
   - Check Node.js version
   - Verify environment variables
   - Check for dependency conflicts

2. Runtime Errors
   - Check application logs
   - Verify database connection
   - Check third-party service status

3. Performance Issues
   - Monitor server resources
   - Check database performance
   - Optimize frontend assets

### Support

For deployment issues:
1. Check the documentation
2. Search existing issues
3. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details
   - Logs and screenshots 