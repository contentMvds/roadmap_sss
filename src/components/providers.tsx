'use client';

import { ProgressProvider } from '@/lib/progress-store';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
