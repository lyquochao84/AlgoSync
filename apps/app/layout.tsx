// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

import NestedLayout from '@/components/NestedLayout/NestedLayout';

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
      <body suppressHydrationWarning={true}>
        <NestedLayout>{children}</NestedLayout>
      </body>
    </html>
  );
}
