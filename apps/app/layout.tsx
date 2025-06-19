// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

import OnboardingLayout from '@/components/OnboardingLayout/OnboardingLayout';

export const metadata: Metadata = {
  title: 'AlgoSync',
  description: 'AlgoSync',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <OnboardingLayout>{children}</OnboardingLayout>
      </body>
    </html>
  );
}
