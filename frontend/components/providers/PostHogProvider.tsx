'use client';

import { usePostHogPageView } from '@/lib/posthog';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  usePostHogPageView();
  return <>{children}</>;
} 