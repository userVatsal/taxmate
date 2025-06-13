import posthog from 'posthog-js';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Initialize PostHog
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') {
        posthog.debug();
      }
    },
    capture_pageview: false, // We'll handle this manually
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: process.env.NODE_ENV === 'development',
    mask_all_text: true,
    mask_all_element_attributes: true,
  });
}

// Custom hook for Next.js page view tracking
export function usePostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);
}

export default posthog; 