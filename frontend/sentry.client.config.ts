import * as Sentry from '@sentry/nextjs';
import { Replay } from '@sentry/replay';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    new Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry event:', event);
    }
    return event;
  },
}); 