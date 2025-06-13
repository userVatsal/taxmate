import * as Sentry from '@sentry/nextjs';
import posthog from './posthog';

type Context = Record<string, unknown>;
type Properties = Record<string, unknown>;
type Traits = Record<string, unknown>;

export const trackError = (error: Error, context?: Context) => {
  console.error(error);
  Sentry.captureException(error, {
    extra: context,
  });
};

export const trackEvent = (eventName: string, properties?: Properties) => {
  posthog.capture(eventName, properties);
};

export const trackPageView = (url: string) => {
  posthog.capture('$pageview', {
    $current_url: url,
  });
};

export const trackUserAction = (action: string, properties?: Properties) => {
  posthog.capture(action, {
    ...properties,
    timestamp: new Date().toISOString(),
  });
};

export const identifyUser = (userId: string, traits?: Traits) => {
  posthog.identify(userId, traits);
};

export const resetUser = () => {
  posthog.reset();
}; 